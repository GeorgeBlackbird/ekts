interface UserReview {
  LastName: string;
  FirstName: string;
  FatherName: string;
}

// Интерфейс для быстрого переключения на внутреннюю апи собственного Бэкенда
interface Reviews {
  getReviews(limit: number): Promise<UserReview[]>;
  //TODO updateReviews
}

class TemplateReviews implements Reviews {
  apiUrl: string;

  constructor(api: string) {
    this.apiUrl = api;
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

      return JSON.parse(data as string) as UserReview[];
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      throw error;
    }
  }
}

export { TemplateReviews };
