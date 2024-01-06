import React from 'react';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
  },
  baseDiv: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  borderDivRed: {
    boxSizing: 'border-box',
    border: '2px solid red',
  },
  borderDivBlue: {
    boxSizing: 'border-box',
    border: '2px solid blue',
  },
  borderDivGreen: {
    boxSizing: 'border-box',
    border: '2px solid green',
  },
  borderDivYellow: {
    boxSizing: 'border-box',
    border: '2px solid yellow',
  },
  gameArea: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  playerArea: {
    flexDirection: 'row',
    width: '100%',
    height: '20%',
  },
  gameControls: {
    flexDirection: 'column',
    width: '10%',
  },
  board: {
    flex: 1,
  },
  players: {
    width: '10%',
  },
  mainBoard: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: '75px',
    paddingRight: '75px',
  },
  locationAndDarkArtsEvents: {
    flex: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  villainAndDiscard: {
    flex: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  villains: {
    flex: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  villainAndAttacks: {
    flexDirection: 'column',
  },
  location: {
    width: '200px',
    height: '150px',
  },
  darkArtsEvent: {
    width: '150px',
    height: '150px',
  },
  villain: {
    width: '200px',
    height: '150px',
  },
  attacksArea: {
    width: '200px',
    height: '75px',
    marginTop: '10px',
  },
  cardShop: {
    flexDirection: 'column',
    width: '30%',
  },
  cardShopStackArea: {},
  cardShopStack: {
    height: '150px',
    width: '100px',
    margin: '25px',
  },
  cardShopAvailableArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: '25px',
    paddingBottom: '25px',
  },
  cardShopAvailable: {
    height: '150px',
    width: '100px',
    marginLeft: '50px',
    marginRight: '50px',
  },
});

function join(...classNames: (string | undefined)[]): string {
  return classNames.filter(Boolean).join(' ');
}

export default function Game() {
  const classes = useStyles();

  return (
    <div className={join(classes.container)}>
      <div
        className={join(
          classes.gameArea,
          classes.baseDiv,
          classes.borderDivRed
        )}
      >
        <div
          className={join(
            classes.gameControls,
            classes.baseDiv,
            classes.borderDivBlue
          )}
        ></div>
        <div
          className={join(
            classes.board,
            classes.baseDiv,
            classes.borderDivBlue
          )}
        >
          <div
            className={join(
              classes.mainBoard,
              classes.baseDiv,
              classes.borderDivGreen
            )}
          >
            <div
              className={join(
                classes.locationAndDarkArtsEvents,
                classes.baseDiv,
                classes.borderDivYellow
              )}
            >
              <div
                className={join(
                  classes.location,
                  classes.baseDiv,
                  classes.borderDivRed
                )}
              ></div>
              <div
                className={join(
                  classes.darkArtsEvent,
                  classes.baseDiv,
                  classes.borderDivRed
                )}
              ></div>
              <div
                className={join(
                  classes.darkArtsEvent,
                  classes.baseDiv,
                  classes.borderDivRed
                )}
              ></div>
            </div>
            <div
              className={join(
                classes.villainAndDiscard,
                classes.baseDiv,
                classes.borderDivYellow
              )}
            >
              <div
                className={join(
                  classes.villain,
                  classes.baseDiv,
                  classes.borderDivRed
                )}
              ></div>
              <div
                className={join(classes.baseDiv, classes.borderDivRed)}
              ></div>
              <div
                className={join(
                  classes.villain,
                  classes.baseDiv,
                  classes.borderDivRed
                )}
              ></div>
            </div>
            <div
              className={join(
                classes.villains,
                classes.baseDiv,
                classes.borderDivYellow
              )}
            >
              <div
                className={join(
                  classes.villainAndAttacks,
                  classes.baseDiv,
                  classes.borderDivRed
                )}
              >
                <div
                  className={join(
                    classes.villain,
                    classes.baseDiv,
                    classes.borderDivBlue
                  )}
                ></div>
                <div
                  className={join(
                    classes.attacksArea,
                    classes.baseDiv,
                    classes.borderDivBlue
                  )}
                ></div>
              </div>
              <div
                className={join(
                  classes.villainAndAttacks,
                  classes.baseDiv,
                  classes.borderDivRed
                )}
              >
                <div
                  className={join(
                    classes.villain,
                    classes.baseDiv,
                    classes.borderDivBlue
                  )}
                ></div>
                <div
                  className={join(
                    classes.attacksArea,
                    classes.baseDiv,
                    classes.borderDivBlue
                  )}
                ></div>
              </div>
              <div
                className={join(
                  classes.villainAndAttacks,
                  classes.baseDiv,
                  classes.borderDivRed
                )}
              >
                <div
                  className={join(
                    classes.villain,
                    classes.baseDiv,
                    classes.borderDivBlue
                  )}
                ></div>
                <div
                  className={join(
                    classes.attacksArea,
                    classes.baseDiv,
                    classes.borderDivBlue
                  )}
                ></div>
              </div>
            </div>
          </div>
          <div
            className={join(
              classes.cardShop,
              classes.baseDiv,
              classes.borderDivGreen
            )}
          >
            <div
              className={join(
                classes.cardShopStackArea,
                classes.baseDiv,
                classes.borderDivYellow
              )}
            >
              <div
                className={join(
                  classes.cardShopStack,
                  classes.baseDiv,
                  classes.borderDivRed
                )}
              ></div>
            </div>
            <div
              className={join(
                classes.cardShopAvailableArea,
                classes.baseDiv,
                classes.borderDivYellow
              )}
            >
              <div
                className={join(
                  classes.cardShopAvailable,
                  classes.baseDiv,
                  classes.borderDivRed
                )}
              ></div>
              <div
                className={join(
                  classes.cardShopAvailable,
                  classes.baseDiv,
                  classes.borderDivRed
                )}
              ></div>
              <div
                className={join(
                  classes.cardShopAvailable,
                  classes.baseDiv,
                  classes.borderDivRed
                )}
              ></div>
              <div
                className={join(
                  classes.cardShopAvailable,
                  classes.baseDiv,
                  classes.borderDivRed
                )}
              ></div>
              <div
                className={join(
                  classes.cardShopAvailable,
                  classes.baseDiv,
                  classes.borderDivRed
                )}
              ></div>
              <div
                className={join(
                  classes.cardShopAvailable,
                  classes.baseDiv,
                  classes.borderDivRed
                )}
              ></div>
            </div>
          </div>
        </div>
        <div
          className={join(
            classes.players,
            classes.baseDiv,
            classes.borderDivBlue
          )}
        ></div>
      </div>
      <div
        className={join(
          classes.playerArea,
          classes.baseDiv,
          classes.borderDivRed
        )}
      ></div>
    </div>
  );
}
