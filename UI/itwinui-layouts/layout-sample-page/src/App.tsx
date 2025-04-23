import '@itwin/itwinui-layouts-css/styles.css';
import { PageLayout } from '@itwin/itwinui-layouts-react';
import { Button, Surface } from '@itwin/itwinui-react';
import DemoHeader from './Header/DemoHeader';
import { SideNavigationBar } from './Navigation/SideNavigationBar';
export default function App() {
  return (
    <PageLayout>
      <PageLayout.Header>
      <DemoHeader />
      </PageLayout.Header>

      <PageLayout.SideNavigation>
          <SideNavigationBar />
      </PageLayout.SideNavigation>

      <PageLayout.Content padded>
        <PageLayout.TitleArea>
          <div>My iTwin Application</div>
        </PageLayout.TitleArea>
        <PageLayout.ToolsArea
          left={<Button>Left Tool Area</Button>}
          right={<Button>Right Tool Area</Button>}
        />
        <Surface elevation={1} >
          <div>Content</div>
          {/* <DemoContent /> */}
        </Surface>
      </PageLayout.Content>
    </PageLayout>

  );
}
