import reviews from "@/mock/reviews.json";

//#region Primitives
interface UserReview {
  LastName: string;
  FirstName: string;
  FatherName: string;
  Gender: Gender
  Star: number;
  Review?: string;
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
  apiUrl: string;
  reviews: MockReviewTexts;

  constructor(api: string) {
    this.apiUrl = api;
    this.reviews = reviews;
  }

  generateStars(min: number, max: number): number {
    const random = Math.random() * (max - min) + min;
    return parseFloat(random.toFixed(1));
  }

  getRandomReview(gender: Gender): string {
    const reviewsArray = this.reviews[gender];    
    if (!reviewsArray || reviewsArray.length === 0) {
      return "Отличное приложение!";
    }
    const randomIndex = Math.floor(Math.random() * reviewsArray.length);
    return reviewsArray[randomIndex] ?? '';
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
        };
      });
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      throw error;
    }
  }
}
//#endregion

export { TemplateReviews };
