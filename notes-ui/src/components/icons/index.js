import contact from "./svg/contacts.svg";
import edit from "./svg/edit.svg";
import delele from "./svg/delete.svg";
import notes from './svg/notes.svg';

export const ContactIcon = () => (<img src={contact} alt="contact" className="w-8" />);
export const EditIcon = () => <img src={edit} alt="edit" className="w-5" />;
export const DeleteIcon = () => (<img src={delele} alt="delete" className="w-5" />);
export const NoteIcon=()=><img src={notes} alt="notes" className="w-10" />