const PageTitle = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div>
      <p className="text-3xl font-bold">{title}</p>
      <p className="text-gray-500 pt-2">{description}</p>
    </div>
  );
};

export default PageTitle;
