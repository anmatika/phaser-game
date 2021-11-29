export type Score = {
  name: string,
  value: number
}

export default class Scores {
  public static scores: Score[]

  public static getScores(): Score[] {
    if (!Scores.scores) {
      Scores.scores = [];
    }

    return Scores.scores;
  }

  public static updateScores(name: string): void {
    if (!Scores.scores) {
      Scores.scores = [];
    }

    if (Scores.scores.find(score => score.name === name) === undefined) {
      Scores.scores.push({
        name: name,
        value: 0
      });
    }

    Scores.scores.forEach(score => {
      if (score.name === name) {
        score.value++;
      }
    });
  }
}
