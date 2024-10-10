import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { fetchTeamMembers } from "@/store/slices/teamAdminSlice";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaRibbon,
  FaRecordVinyl,
} from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import Layout from "../Layout/page";
import Link from "next/link";
import LoadingOrError from "../Loading&Error/page";

const TeamSection = () => {
  const dispatch = useDispatch();
  const { teamMembers, loading, error } = useSelector(
    (state: RootState) => state.teamAdmin
  );

  useEffect(() => {
    dispatch(fetchTeamMembers() as any);
  }, [dispatch]);

  if (loading || error) {
    return <LoadingOrError loading={loading} error={error} />;
  }

  return (
    <Layout>
      <section className="py-20 backdrop-blur border-y border-gray-300 dark:border-gray-800 w-full z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <motion.h3
            className="text-5xl font-extrabold mb-12 text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Meet the Team
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg transition-transform transform 
                hover:scale-105 hover:shadow-xl border-8 border-gray-300 dark:border-gray-600 overflow-hidden hover:border-cyan-500 dark:hover:border-cyan-700 transition-border duration-1000"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                viewport={{ once: true }}
              >
                <Image
                  src={member.images[0]}
                  alt={member.title}
                  width={150}
                  height={150}
                  className="mx-auto rounded-full object-cover w-44 h-44 hover:rounded-none hover:w-full p-4 hover:p-0 transition-all duration-700 z-10"
                />

                <div className="px-6 pb-6">
                  <h4 className="text-2xl font-bold mb-1 text-gray-800 dark:text-gray-200 tracking-wide">
                    {member.title}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 tracking-wide">
                    {member.description}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Link
                      href={member.links.linkedin}
                      aria-label={`${member.title}'s LinkedIn`}
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition-transform transform hover:scale-125"
                    >
                      <FaLinkedin size={24} />
                    </Link>
                    <Link
                      href={member.links.twitter}
                      aria-label={`${member.title}'s Twitter`}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-transform transform hover:scale-125"
                    >
                      <FaTwitter size={24} />
                    </Link>
                    <Link
                      href={member.links.github}
                      aria-label={`${member.title}'s GitHub`}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 transition-transform transform hover:scale-125"
                    >
                      <FaGithub size={24} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TeamSection;
