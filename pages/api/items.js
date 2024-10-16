let items = [
  {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      dob: "2024-10-03",
      gender: "male",
      address: "USA",
      email: "john@gmail.com",
      phoneNumber: "6767675656",
  }
];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
      case "GET":
          res.status(200).json(items);
          break;

      case "POST":
          const { firstName, lastName, dob, gender, address, email, phoneNumber } = req.body;
          if (!firstName || !lastName || !dob || !gender || !address || !email || !phoneNumber) {
              return res.status(400).json({ error: "All fields are required" });
          }

          const newItem = {
              id: (items.length + 1).toString(), // Ensure id is a string
              firstName,
              lastName,
              dob,
              gender,
              address,
              email,
              phoneNumber,
          };
          items.push(newItem);
          res.status(201).json(newItem);
          break;

      case "PUT":
          const { id, ...updateData } = req.body;
          if (!id || !updateData.firstName || !updateData.lastName || !updateData.dob || !updateData.gender || !updateData.address || !updateData.email || !updateData.phoneNumber) {
              return res.status(400).json({ error: "All fields are required" });
          }

          items = items.map((item) => (item.id === id ? { ...item, ...updateData } : item));
          res.status(200).json({ id, ...updateData });
          break;

      case "DELETE":
          const { id: deleteId } = req.query;
          items = items.filter((item) => item.id !== deleteId); // Keep id as string
          res.status(204).end();
          break;

      default:
          res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
          res.status(405).end(`Method ${method} Not Allowed`);
  }
}
