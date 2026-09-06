import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiSearch } from 'react-icons/fi';
import { projects as staticProjects, projectCategories } from '../../data/portfolioData';
import { projectsApi } from '../../services/api';
import './Projects.scss';

const PAGE_SIZE = 4;

export default function Projects() {
  const [projects, setProjects] = useState(staticProjects);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);

  useEffect(() => {
    projectsApi
      .list()
      .then(({ data }) => {
        if (Array.isArray(data) && data.length > 0) setProjects(data);
      })
      // Backend not running, or nothing saved yet — keep showing the
      // built-in project list rather than an empty section.
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesQuery =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [projects, query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  return (
    <section id="work" className="projects section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Projects</span>
          <h2>
            Featured work
          </h2>
        </div>

        <div className="projects__controls">
          <div className="projects__search">
            <FiSearch />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              aria-label="Search projects"
            />
          </div>

          <div className="projects__filters">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                className={`projects__filter ${category === cat ? 'projects__filter--active' : ''}`}
                onClick={() => handleFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid--2 projects__grid">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                layout
                key={project.id}
                className="project-card card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {project.featured && <span className="project-card__badge">Featured</span>}
                <span className="tag project-card__category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-card__tech">
                  {project.tech.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="project-card__links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <FiGithub /> Code
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      <FiExternalLink /> Live Demo
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && <p className="projects__empty">No projects match your search.</p>}

        {totalPages > 1 && (
          <div className="projects__pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={`projects__page ${page === n ? 'projects__page--active' : ''}`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
