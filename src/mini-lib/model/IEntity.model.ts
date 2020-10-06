import { IField } from './IField.model';

/**
 * Объект сущность представляет собой поле прикладного
 * программииста, расширенное входным параметром и
 * коллбеком изменения для внутренней организации
 * работы.
 */
export interface IEntity extends IField {
  change?: (object) => void;
  object: object;
}
