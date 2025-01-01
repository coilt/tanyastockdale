import React from "react";
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
import { parse } from "node-html-parser";
import { Button } from "@/components/ui/button"

const Paragraph = ({ children }) => (
  <p className="mb-8 text-base/7 text-gray-700">{children}</p>
);

const Blockquote = ({ children }) => (
  <figure className="mt-8 mb-8 border-l-4 border-emerald-600 pl-6">
    <blockquote className="text-3xl font-serif font-bold text-avocado">
      {children.split("<br>").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < children.split("<br>").length - 1 && <br />}
        </React.Fragment>
      ))}
    </blockquote>
  </figure>
);
const Heading1 = ({ children }) => (
  <h1 className="mt-8 font-serif text-4xl font-semibold tracking-tight text-pretty text-avocado sm:text-5xl">
    {children}
  </h1>
);

const Heading2 = ({ children }) => (
  <h2 className="mt-8 font-serif text-3xl font-semibold tracking-tight text-pretty text-avocado">
    {children}
  </h2>
);

const Heading3 = ({ children }) => (
  <h3 className="mt-8 font-serif text-2xl font-semibold tracking-tight text-pretty text-avocado">
    {children}
  </h3>
);

const List = ({ items }) => (
  <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
    {items.map((item, index) => (
      <li key={index} className="flex gap-x-3">
        <span>
          <strong className="font-semibold text-avocado">{item}</strong>
        </span>
      </li>
    ))}
  </ul>
);

const Image = ({ src, alt, caption }) => (
  <figure className="mt-16">
    <img src={src} alt={alt} className="w-full rounded-lg" />
    <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-gray-500">
      <InformationCircleIcon aria-hidden="true" className="mt-0.5 size-5 flex-none text-gray-300" />
      {caption}
    </figcaption>
  </figure>
);


const BlogPost = ({ post }) => {
  const renderContent = (content) => {
    const root = parse(content);
    return root.childNodes.map((node, index) => {
      switch (node.tagName) {
        case "P":
          return <Paragraph key={index}>{node.textContent}</Paragraph>;
        case "H1":
          return <Heading1 key={index}>{node.textContent}</Heading1>;
        case "H2":
          return <Heading2 key={index}>{node.textContent}</Heading2>;
        case "H3":
          return <Heading3 key={index}>{node.textContent}</Heading3>;
        
          case "BLOCKQUOTE":
        return <Blockquote key={index}>{node.textContent}</Blockquote>;
        

case "FIGURE":
  if (node.classList.contains("kg-image-card")) {
    const img = node.querySelector("img");
    const captionSpan = node.querySelector("figcaption span");
    const caption = captionSpan ? captionSpan.textContent.trim() : "";
    return (
      <Image
        key={index}
        src={img.getAttribute("src")}
        alt={img.getAttribute("alt")}
        caption={caption}
      />
    );
  }
  return null;


        case "UL":
          const items = node.querySelectorAll("li").map((li) => li.textContent);
          return <List key={index} items={items} />;
        default:
          return null;
      }
    });
  };

  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
      <Button asChild className="mb-8 bg-emerald-800 hover:bg-emerald-600 transition-all duration-300 ease-in-out p-4 sm:p-2">
                <a href="/blog">← Back to All Posts</a>
      </Button>
        {post.feature_image && (
          <img
            src={post.feature_image}
            alt={post.title}
            className="w-full  object-cover rounded-xl mb-8"
          />
        )}
        <h1 className="text-4xl font-bold font-serif mb-2 text-avocado">{post.title}</h1>
        {renderContent(post.html)}
      </div>
    </div>
  );
};


const BlogPosts = ({ posts }) => {
  return (
    <main className="mt-20">
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </main>
  );
};
  
export { BlogPost, BlogPosts };



