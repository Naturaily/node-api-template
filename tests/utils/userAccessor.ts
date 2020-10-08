type UserInput = {
  id: number;
  email: string;
  name: string;
};

export const userAccessor = {
  value: null,
  set(input: UserInput): void {
    this.value = { ...input };
  },
  get(): UserInput {
    return this.value;
  },
};
