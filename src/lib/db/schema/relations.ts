import { defineRelations } from 'drizzle-orm';
import { account, session } from './auth';
import { games } from './games';
import { gameTypes } from './gameTypes';
import { rounds } from './rounds';
import { scores } from './scores';
import { users } from './users';

export const relations = defineRelations({ users, rounds, scores, games, gameTypes, session, account }, r => ({
  users: {
    scores: r.many.scores({
      from: r.users.id,
      to: r.scores.userId,
    }),
    sessions: r.many.session({
      from: r.users.id,
      to: r.session.id,
    }),
    accounts: r.many.account({
      from: r.users.id,
      to: r.account.id,
    }),
  },
  games: {
    rounds: r.many.rounds({
      from: r.games.id,
      to: r.rounds.gameId,
    }),
    gameType: r.one.gameTypes(),
  },
  rounds: {
    game: r.one.games(),
    scores: r.many.scores({
      from: r.rounds.id,
      to: r.scores.roundId,
    }),
  },
  scores: {
    user: r.one.users(),
    round: r.one.rounds(),
  },
  gameTypes: {
    games: r.many.games({
      from: r.gameTypes.id,
      to: r.games.gameTypeId,
    }),
  },
  session: {
    user: r.one.users(),
  },
  account: {
    user: r.one.users(),
  },
}));
