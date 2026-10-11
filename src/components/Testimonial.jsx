import { Star } from 'lucide-react';
import user1 from '../assets/user1.jpg';
import user2 from '../assets/user2.jpg';
import user3 from '../assets/user3.jpg';

const REVIEWS = [
  {
    name: 'Sophia Martinez',
    role: 'Home Cook & Nutritionist',
    img: user1,
    comment:
      '“Smart Recipe Finder completely changed how I look at my leftovers. I used to stare blankly into my fridge—now I just punch in three ingredients and get a restaurant-quality meal in 20 minutes.”',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'Software Engineer & Foodie',
    img: user2,
    comment:
      '“The AI recipe generator and checklist feature are absolute game changers. It made cooking on weeknights exciting instead of exhausting. Plus, my grocery bill dropped noticeably!”',
    rating: 5,
  },
  {
    name: 'Emily Watson',
    role: 'Busy Parent of Two',
    img: user3,
    comment:
      '“Clean, fast, and gorgeous UI. Finding vegetarian options for my family with only the random vegetables in our crisper drawer has never been easier. Truly well built by Arihant!”',
    rating: 5,
  },
];

const Testimonial = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-100/60 rounded-3xl my-12">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">
          User Feedback
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
          Loved by 10,000+ Home Chefs
        </h2>
        <p className="mt-3 text-base text-slate-600">
          See how cooks everywhere are saving time, money, and food with Smart Recipe Finder.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REVIEWS.map((rev, i) => (
          <div
            key={i}
            className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <div>
              {/* Star Rating */}
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(rev.rating)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed italic mb-6">{rev.comment}</p>
            </div>

            <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
              <img
                src={rev.img}
                alt={rev.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900">{rev.name}</h4>
                <p className="text-xs text-slate-500">{rev.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
