export type ScoreType = {
  name: string,
  value: number
}

export default class Score {
  public static scores: ScoreType[]

  public static getScores() {
    if (!Score.scores) {
      Score.scores = []
    }

    return Score.scores
  }
  public static updateScores(name: string) {
    if (!Score.scores) {
      Score.scores = []
    }

    if (Score.scores.find(score => score.name === name) === undefined) {
      Score.scores.push({
        name: name,
        value: 0
      })
    }

    Score.scores.forEach(score => {
      if (score.name === name) {
        score.value++
      }
    })
  }
}
