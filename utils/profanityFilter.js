import Filter from "bad-words";

const filter = new Filter();

export default (text)=>{
    return filter.isProfane(text);
}