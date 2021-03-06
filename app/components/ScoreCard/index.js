import React from 'react';
import { pathOr } from 'ramda';
import { smallLogoForTeamName } from '../../utils/team';
import VideoPlayer from '../VideoPlayer';
import PlayIcon from '../../public/images/play-button.svg';
import './styles.scss';

const ScoreCard = ({ game }) => (
  <div className="game-card-wrapper">
    <div className="game-card">
      <div className="game-card-header">
        {game.status.friendlyStatus}
        {' '}
        <span>
          {game.statusText}
          {game.liveFeed.finalPeriod}
          {
            game.seriesSummary && (
              <span className="game-card-series-summary">{game.seriesSummary.seriesStatusShort || ''}</span>
            )
          }

        </span>
      </div>
      <div className="game-card-team">
        <svg key={Math.random()} className="game-card-team-img">
          <use xlinkHref={`/public/images/teams/season/20182019.svg#team-${game.teams.away.team.id}-20182019-light`} />
        </svg>
        <a className="game-card-team-name" href={`/team?id=${game.teams.away.team.id}`}>
          {game.teams.away.team.name}
        </a>
        <div className="game-card-team-score">
          {
            game.status.isScheduled ? (
              <span>
                {game.teams.away.leagueRecord.wins}
                {'-'}
                {game.teams.away.leagueRecord.losses}
                {''}
                { game.teams.away.leagueRecord.ot ? `-${game.teams.away.leagueRecord.ot}` : game.seriesSummary
                }
              </span>
            ) : (
              game.teams.away.score
            )
          }
        </div>
      </div>
      <div className="game-card-team">
        <svg key={Math.random()} className="game-card-team-img">
          <use xlinkHref={`/public/images/teams/season/20182019.svg#team-${game.teams.home.team.id}-20182019-light`} />
        </svg>
        <a className="game-card-team-name" href={`/team?id=${game.teams.home.team.id}`}>
          {game.teams.home.team.name}
        </a>
        <div className="game-card-team-score">
          {
            game.status.isScheduled ? (
              <span>
                {game.teams.home.leagueRecord.wins}
                {'-'}
                {game.teams.home.leagueRecord.losses}
                {''}
                { game.teams.away.leagueRecord.ot ? `-${game.teams.away.leagueRecord.ot}` : game.seriesSummary
                }
              </span>
            ) : (
              game.teams.home.score
            )
          }
        </div>
      </div>
      {
        !game.status.isScheduled && (
          <div className="game-card-footer">
            <a href={`/game?id=${game.id}`}>
                Summary
            </a>
            {
              pathOr(false, ['highlights', 'recap'], game) && (
                <span>
                  <VideoPlayer url={game.highlights.recap} callToAction="Game Recap" />
                </span>
              )
            }
          </div>
        )
      }
    </div>
  </div>
);

export default ScoreCard;
