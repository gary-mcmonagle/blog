import { ModalProps, Modal } from "../../components/modal/modal";

export type BlogSaveModalProps = ModalProps & {};
export const BlogSaveModal = (props: BlogSaveModalProps) => {
  return (
    <Modal {...props}>
      <p>Blog Save Modal</p>
    </Modal>
  );
};
