import { gql } from 'apollo-boost';

const getGameQuery = gql`
query($id: String) {
  game (id: $id) {
    id
    statusText
    highlights {
      recap
      goals {
        statsEventId
        periodTime
        period
        url
      }
    }
    liveFeed {
      shootoutSummary {
        away {
          scores
          attempts
        }
        home {
          scores
          attempts
        }
      }
      penaltySummary {
        type
        severity
        minutes
        period
        periodTime
        team {
          name
          triCode
          id
        }
        receiver {
          id
          fullName
        }
      }
      goalSummary {
        period
    		periodTime
        isWinningGoal
        isEmptyNet
        strength
        team {
          name
          triCode
          id
        }
        scorer {
          id
          fullName
          seasonTotal
        }
        assists {
          id
          fullName
          seasonTotal
        }
      }
      lastTenPlays {
        period
        periodTimeRemaining
        periodType
        periodTime
        description
      }
      status {
        codedGameState
        detailedState
        friendlyStatus
      }
    }
    boxscore {
      away {
        team {
          id
          name
          teamName
          abbreviation
          locationName
        }
        seasonTeamStats {
          record
          splits {
            wins
            losses
            ot
            pts
          }
        }
        teamStats {
          goals
          shots
          pim
          powerPlayGoals
          powerPlayOpportunities
          faceOffWinPercentage
          blocked
          takeaways
          giveaways
          hits
        }
        players {
          person {
            id
            fullName
          }
          jerseyNumber
          position {
            abbreviation
          }
          boxscore {
            goals
            assists
            shots
            hits
            plusMinus
            blocked
            takeaways
            giveaways
            timeOnIce
            penaltyMinutes
            pim
            faceOffWins
            faceOffTaken
            powerPlaySavePercentage
            evenStrengthSavePercentage
            shortHandedSavePercentage
            savePercentage
            saves
          }
        }
      }
      home {
        team {
          id
          name
          teamName
          abbreviation
          locationName
        }
        teamStats {
          goals
          shots
          pim
          powerPlayGoals
          powerPlayOpportunities
          faceOffWinPercentage
          blocked
          takeaways
          giveaways
          hits
        }
        seasonTeamStats {
          record
          splits {
            wins
            losses
            ot
            pts
          }
        }
        players {
          person {
            id
            fullName
          }
          position {
            abbreviation
          }
          jerseyNumber
          boxscore {
            goals
            assists
            shots
            hits
            plusMinus
            blocked
            takeaways
            giveaways
            timeOnIce
            penaltyMinutes
            pim
            faceOffWins
            faceOffTaken
            powerPlaySavePercentage
            evenStrengthSavePercentage
            shortHandedSavePercentage
            savePercentage
            saves
          }
        }
      }
    }
  }
}
`;

export { getGameQuery };
