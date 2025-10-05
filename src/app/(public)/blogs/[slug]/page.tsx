import Image from "next/image";

export default async function BlogDetails({ params }: { params: { slug: string } }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${params.slug}`, {
        cache: "no-store", // ensures fresh data
    });
    const data = await res.json();
    const blog = data?.data;

    return (
        <section className="min-h-screen px-4 md:px-16 py-20 ">
            <div className="max-w-4xl mx-auto p-6 md:p-10 rounded-2xl shadow-lg border border-purple-100">
                {blog?.thumbnail && (
                    <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        width={800}
                        height={300}
                        className="w-full h-72 object-cover rounded-xl mb-6"
                    />
                )}

                <h1 className="text-4xl font-extrabold text-purple-700 mb-3 leading-snug">
                    {blog?.title}
                </h1>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <p>
                        By <span className="font-medium text-purple-600">{blog?.author || "Unknown"}</span>
                    </p>
                    <p>{new Date(blog?.createdAt || "").toLocaleDateString()}</p>
                </div>

                <hr className="my-4 border-purple-200" />

                <div className="text-muted leading-relaxed text-lg whitespace-pre-line">
                    {blog?.content}
                </div>

                <div className="mt-10 text-center">
                    <button className="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md transition">
                        Back to Blogs
                    </button>
                </div>
            </div>
        </section>
    );
}
