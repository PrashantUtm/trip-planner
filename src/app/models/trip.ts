import { ChecklistItem } from "./checklist-item";
import { Destination } from "./destination";
import { Traveller } from "./traveller";

export interface Trip {
    id: string;
    title: string;
    startDestination: Destination;
    finalDestination: Destination;
    budget: number;
    otherDestinations?: Destination[];
    checklistItems?: ChecklistItem[];
    travellers: Traveller[];
    photos?: string[];
}
