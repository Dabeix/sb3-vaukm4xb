import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { ContactSection } from '../components/ContactSection';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Les bienfaits de l'aquafitness sur la santé",
    excerpt: "Découvrez comment l'aquafitness peut améliorer votre condition physique et votre bien-être général...",
    author: "Sophie Martin",
    date: "15 mars 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1622465413073-811143c93c85?auto=format&fit=crop&q=80&w=800",
    category: "Santé"
  },
  {
    id: 2,
    title: "Préparer son bébé à sa première séance de natation",
    excerpt: "Conseils et astuces pour une première expérience aquatique réussie avec votre tout-petit...",
    author: "Marie Dubois",
    date: "10 mars 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=800",
    category: "Bébé Nageur"
  },
  {
    id: 3,
    title: "Comment le sauna améliore la récupération sportive",
    excerpt: "Les effets bénéfiques du sauna sur la récupération musculaire et la performance athlétique...",
    author: "Thomas Bernard",
    date: "5 mars 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800",
    category: "Bien-être"
  },
  {
    id: 4,
    title: "5 exercices d'aquagym pour tonifier son corps",
    excerpt: "Une sélection d'exercices efficaces pour muscler l'ensemble de votre corps en douceur...",
    author: "Julie Petit",
    date: "1 mars 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800",
    category: "Fitness"
  },
  {
    id: 5,
    title: "Organiser un anniversaire aquatique inoubliable",
    excerpt: "Des idées originales pour célébrer un anniversaire dans notre centre aquatique...",
    author: "Claire Rousseau",
    date: "25 février 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800",
    category: "Événements"
  },
  {
    id: 6,
    title: "Les tendances fitness aquatiques de 2024",
    excerpt: "Découvrez les nouvelles activités aquatiques qui font sensation cette année...",
    author: "Marc Lambert",
    date: "20 février 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800",
    category: "Tendances"
  }
];

export const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-amatic font-bold text-center mb-4">BLOG</h1>
          <p className="text-center text-blue-100 max-w-2xl mx-auto">
            Actualités, conseils et astuces pour votre bien-être aquatique
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="bg-blue-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">
              Restez informé !
            </h2>
            <p className="text-gray-600 mb-6">
              Inscrivez-vous à notre newsletter pour recevoir nos derniers articles et actualités
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};