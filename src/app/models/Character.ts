export class Character {

    public _id: string;

    public name: String;

    public configuration: {
        hidden: Boolean,
        tasks: {
            task: String,
            hidden: Boolean,
            priority: number,
        }[]
    }
}