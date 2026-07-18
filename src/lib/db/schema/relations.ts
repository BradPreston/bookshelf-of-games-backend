import { defineRelations } from 'drizzle-orm';
import { games } from './games';
import { rounds } from './rounds';
import { scores } from './scores';
import { users } from './users';

export const relations = defineRelations({ users, rounds, scores, games }, r => ({
  users: {
    scores: r.many.scores({
      from: r.users.id,
      to: r.scores.userId,
    }),
  },
  games: {
    rounds: r.many.rounds({
      from: r.games.id,
      to: r.rounds.gameId,
    }),
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
}));
