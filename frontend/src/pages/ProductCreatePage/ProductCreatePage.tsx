import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseApi } from "../../shared/api/baseApi";
import { postProduct } from "../../features/product/api/productApi";

type Rubric = {
  id: string;
  name: string;
};

export default function CreateProduct() {
  const navigate = useNavigate();

  const [rubrics, setRubrics] = useState<Rubric[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    images: "",
    rubricId: "",
  });

  
  useEffect(() => {
    async function loadRubrics() {
      try {
        const res = await baseApi.get("/rubrics");

        console.log("rubrics response:", res.data);

        
        const data =
          res.data?.items ||
          res.data?.data ||
          res.data?.rubrics ||
          res.data;

        if (Array.isArray(data)) {
          setRubrics(data);
        } else {
          setRubrics([]);
        }
      } catch (e) {
        console.error(e);
        setRubrics([]);
      }
    }

    loadRubrics();
  }, []);

  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await postProduct({
        title: form.title,
        description: form.description,
        price: Number(form.price),
        images: form.images,
        rubricId: form.rubricId, // UUID
      });

      navigate("/products");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Create product failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-lg bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">

        <h1 className="text-3xl font-semibold text-white mb-6 text-center">
          Create Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
          />

          
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
          />

        
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
          />

         
          <input
            type="text"
            name="images"
            placeholder="Image URL"
            value={form.images}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
          />

         
          <select
            name="rubricId"
            value={form.rubricId}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
          >
            <option value="">Select category</option>

            {Array.isArray(rubrics) &&
              rubrics.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
          </select>

         
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

         
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-medium disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create product"}
          </button>
        </form>
      </div>
    </div>
  );
}