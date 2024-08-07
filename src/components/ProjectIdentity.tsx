import ArticleTag from './ArticleTag';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_MAP } from '~/translations/config';
import { CONTENT } from '~/util/cdn/constants';
import { useMemo } from 'react';
import { TaggedContentItem } from './types';
import ResourceExtensionRemover from '~/util/string/ResourceExtensionRemover';

interface ProjectIdentityProps {
  project?: TaggedContentItem;
  disableHover?: boolean;
}

export default function ProjectIdentity({ project, disableHover }: ProjectIdentityProps) {
  const { i18n } = useTranslation();
  const language = i18n.language as keyof typeof LANGUAGE_MAP;

  const baseClassName = useMemo(
    () => ["project-identity", ...(disableHover ? ["no-hover"] : [])].join(" "),
    [disableHover]
  );

  const thumbnail = useMemo(() => project?.thumbnail ? ResourceExtensionRemover(project.resource) + "/thumbnail.ico" : undefined, [project]);

  if (!project) {
    return null;
  }

  return (
    <div className={ baseClassName }>
      { thumbnail
        ? <img className="project-identity__image"
            src={new URL(thumbnail, CONTENT).toString()}
            alt={project.name[language]}
          />
        : <div className="project-identity__image"></div>
      }
      <div className="project-identity__details">
        <h2>{ project.name[language] }</h2>
        <p>{ new Date(project.activeSince).toLocaleDateString() }</p>
        <div>
          { project.tags.map((tag) => (
            <ArticleTag key={ tag.name } item={ tag } />
          ))}
        </div>
      </div>
    </div>
  );
}
