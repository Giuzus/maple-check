import { Class } from "./Class";

export class Character {

    public _id: String;

    public name: String;

    public level: Number;

    public class: Class;

    public configuration: {
        hidden: Boolean,
        tasks: {
            task: String,
            hidden: Boolean,
            priority: Number,
        }[]
    }
}