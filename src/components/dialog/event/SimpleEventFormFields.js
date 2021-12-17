import StageFormFields from "./StageFormFields";
import SportsSelect from "../../other/SportsSelect";

export default function SimpleEventFormFields({event, onChange}) {
    return (
        <div>
            <SportsSelect value={event.sportId} onChange={onChange('sportId')}/>
            <StageFormFields stage={event} onChange={onChange}/>
        </div>
    );
}