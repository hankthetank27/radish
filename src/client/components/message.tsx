interface Props {
  message: string
};

export const Message = ({ message }: Props) => {
  return (
    <div className="message">{message}</div>
  );
};