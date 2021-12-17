import CommonEventFormFields from "./CommonEventFormFields";
import SportsSelect from "../../other/SportsSelect";

export default function StageEventFormFields({event, onChange}) {
    return (
        <div>
            <SportsSelect value={event.sportId} onChange={onChange('sportId')}/>
            <CommonEventFormFields event={event} onChange={onChange}/>
        </div>
    );
}