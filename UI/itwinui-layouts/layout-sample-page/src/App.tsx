import '@itwin/itwinui-layouts-css/styles.css';
import { PageLayout } from '@itwin/itwinui-layouts-react';
import { Button, Surface } from '@itwin/itwinui-react';
import MainHeader from './Header/MainHeader';
import { SideNavigationBar } from './Navigation/SideNavigationBar';
import ThemeButton from './Theme/ThemeButton';
export default function App() {
  return (
    <PageLayout>
      <PageLayout.Header>
      <MainHeader />
      </PageLayout.Header>

      <PageLayout.SideNavigation>
          <SideNavigationBar />
      </PageLayout.SideNavigation>

      <PageLayout.Content padded>
        <PageLayout.TitleArea>
          <div>My iTwin Application</div>
        </PageLayout.TitleArea>
        <PageLayout.ToolsArea
          left={<Button>Edit</Button>}
          right={<Button>Draw</Button>}
        />
        <Surface elevation={1} >
          <div>Content</div>
          {/* <DemoContent /> */}
        </Surface>
      </PageLayout.Content>
      <PageLayout.BottomBar style={{ margin: '10px', display: 'flex', justifyContent: 'flex-end', height: '40px' }}>
        <ThemeButton/>
      </PageLayout.BottomBar>
    </PageLayout>

  );
}
