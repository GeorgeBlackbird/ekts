import reviews from "@/mock/reviews.json";

//#region Primitives
interface UserReview {
  LastName: string;
  FirstName: string;
  FatherName: string;
  Gender: Gender;
  Star: number;
  Review: string;
  Icon: string;
}
type Gender = "Женщина" | "Мужчина";
//#endregion

//#region Interfaces
interface Reviews {
  getReviews(limit: number): Promise<UserReview[]>;
  //TODO updateReviews
}
//#endregion

//#region Mock
interface MockReviewTexts {
  Женщина: string[];
  Мужчина: string[];
}

class TemplateReviews implements Reviews {
  iconUrl: string = "https://api.dicebear.com/9.x/thumbs/svg";
  apiUrl: string;
  reviews: MockReviewTexts;

  constructor(api: string) {
    this.apiUrl = api;
    this.reviews = reviews;
  }

  private generateStars(min: number, max: number): number {
    const random = Math.random() * (max - min) + min;
    return parseFloat(random.toFixed(1));
  }

  private getRandomReview(gender: Gender): string {
    const reviewsArray = this.reviews[gender];
    if (!reviewsArray || reviewsArray.length === 0) {
      return "Отличное приложение!";
    }
    const randomIndex = Math.floor(Math.random() * reviewsArray.length);
    return reviewsArray[randomIndex] ?? "";
  }

  private getRandomIcon(): string {
    const gradientColors = [
      'b6e3f4,c0aede,d1d4f9',
      'fbc2eb,a6c1ee',
      'fdcbf1,e6dee9'
    ]
    const seeds = [
      'Sawyer', 'Luis', 'Christian', 'Sophia', 'Maria'
    ]

    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
    const randomGradient = gradientColors[Math.floor(Math.random() * gradientColors.length)];
    
    const params = {
      radius: 50,
      size: 64,
      seed: randomSeed,
      backgroundColor: randomGradient,
      backgroundType: 'gradientLinear',
    };

    const queryString = new URLSearchParams(params as any).toString();
    const icon = `${this.iconUrl}?${queryString}`;
    return icon;
  }

  async getReviews(limit: number): Promise<UserReview[]> {
    try {
      const data = await $fetch(this.apiUrl, {
        query: {
          typeName: "classic",
          count: limit,
          parameters: "LastName,FirstName,FatherName",
        },
      });

      return (JSON.parse(data as string) as UserReview[]).map((person) => {
        const { LastName, FirstName, FatherName, Gender } = person;

        return {
          LastName,
          FirstName,
          FatherName,
          Gender,
          Star: this.generateStars(4.3, 5.0),
          Review: this.getRandomReview(Gender),
          Icon: this.getRandomIcon(),
        };
      });
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      throw error;
    }
  }
}
//#endregion

export type { UserReview };
export { TemplateReviews };
