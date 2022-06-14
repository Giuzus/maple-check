export class Character {

    public _id: String;

    public name: String;

    public configuration: {
        hidden: Boolean,
        tasks: {
            task: String,
            hidden: Boolean,
            priority: Number,
        }[]
    }
}