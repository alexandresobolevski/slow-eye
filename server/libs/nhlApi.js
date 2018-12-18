const {
  flatten, map, mergeAll, path, prop,
} = require('ramda');

const fetch = require('node-fetch');

const nhlApiUrl = 'https://statsapi.web.nhl.com/api/v1';

const cache = {};

const nhlAPI = async (resource) => {
  try {
    if (cache[resource]) {
      return cache[resource];
    }
    const url = `${nhlApiUrl}${resource}`;
    const response = await fetch(url);
    const data = await response.json();
    cache[resource] = data;
    return data;
  } catch (e) {
    return console.error(e.stack || e.toString());
  }
};

const fetchStatsForPlayerId = async (playerId) => {
  const resource = `/people/${playerId}/stats?stats=statsSingleSeason`;
  const playerStatsData = await nhlAPI(resource);
  return path(['stats', 0, 'splits'], playerStatsData);
};

const fetchInfoForTeamId = async (teamId) => {
  const resource = `/teams/${teamId}`;
  const teamInfo = await nhlAPI(resource);
  return path(['teams', 0], teamInfo);
};

const fetchPlayersForTeamId = async (teamId) => {
  const resource = `/teams/${teamId}/roster`;
  const json = await nhlAPI(resource);
  const allRosterIds = map(path(['person', 'id']), json.roster);
  const playerInfo = mergeAll(json.roster.map(p => ({ [p.person.id]: { ...p } })));
  const fullData = allRosterIds.map(id => ({
    teamId, id, ...playerInfo[id],
  }));
  return fullData;
};

const fetchAllTeams = async () => {
  const resource = '/teams';
  const allTeamsData = await nhlAPI(resource);
  return allTeamsData;
};

const fetchAllPlayers = async () => {
  const allTeamsData = await fetchAllTeams();
  const allTeamsIds = map(prop('id'), prop('teams', allTeamsData));
  const allTeamsRosters = await Promise.all(map(fetchPlayersForTeamId, allTeamsIds));
  return flatten(allTeamsRosters);
};

module.exports = {
  nhlAPI,
  fetchStatsForPlayerId,
  fetchInfoForTeamId,
  fetchPlayersForTeamId,
  fetchAllTeams,
  fetchAllPlayers,
};