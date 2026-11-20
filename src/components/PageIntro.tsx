import { Breadcrumb, BreadcrumbDivider, BreadcrumbItem, Text } from '@fluentui/react-components';

export function PageIntro({ eyebrow, title, description, back }: { eyebrow?: string; title: string; description?: string; back?: string }) {
  return (
    <div className="page-intro">
      {back && <Breadcrumb><BreadcrumbItem><Text>Home</Text></BreadcrumbItem><BreadcrumbDivider /><BreadcrumbItem><Text>{back}</Text></BreadcrumbItem></Breadcrumb>}
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      {description && <Text className="page-description">{description}</Text>}
    </div>
  );
}
