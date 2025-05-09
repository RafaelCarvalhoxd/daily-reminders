export class Day {
  private readonly _id: number;
  private readonly _name: string;

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  public getId(): number {
    return this._id;
  }

  public getName(): string {
    return this._name;
  }
}
