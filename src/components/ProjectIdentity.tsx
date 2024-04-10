import { IContentItem, IContentTagItem } from '~/reducers/manifest';
import ArticleTag from './ArticleTag';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_MAP } from '~/translations/config';
import { CONTENT } from '~/util/cdn/constants';

type TaggedContentItem = Omit<IContentItem, "tags"> & { tags: IContentTagItem[] };

interface ProjectIdentityProps {
  project: TaggedContentItem;
}

export default function ProjectIdentity({ project }: ProjectIdentityProps) {
  const { i18n } = useTranslation();
  const language = i18n.language as keyof typeof LANGUAGE_MAP;

  return (
    <div className="project-identity">
      { project.thumbnail
        ? <img className="project-identity__image"
            src={new URL(project.thumbnail, CONTENT).toString()}
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
