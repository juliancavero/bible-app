import AnimatedLayout from "@/components/Animated/AnimatedLayout";
import Card from "@/components/Containers/Card";
import IndexBar from "@/components/Containers/IndexBar";
import MainContainer from "@/components/Containers/MainContainer";
import PaddingBox from "@/components/Containers/PaddingBox";
import BodyText from "@/components/Text/BodyText";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FontSizes, Themes } from "./translations";
import usePreferencesPage from "./usePreferences";

const PreferencesPage = () => {
  const { preferences, goBack, onChangeTheme, theme, onFontSizeChange } =
    usePreferencesPage();
  return (
    <MainContainer>
      <IndexBar text="Preferencias" onClick={goBack} />
      <AnimatedLayout>
        <MainContainer>
          <PaddingBox className="flex flex-col gap-3">
            <Card>
              <SettingsItem>
                <BodyText>Tema seleccionado</BodyText>
                <Select onValueChange={onChangeTheme} value={theme}>
                  <SelectTrigger className="w-1/2 text-end">
                    <SelectValue>{Themes[theme]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">{Themes.light}</SelectItem>
                    <SelectItem value="dark">{Themes.dark}</SelectItem>
                    <SelectItem value="system">{Themes.system}</SelectItem>
                  </SelectContent>
                </Select>
              </SettingsItem>
              <SettingsItem>
                <BodyText>Tamaño del texto</BodyText>
                <Select
                  onValueChange={onFontSizeChange}
                  value={preferences.fontSize}
                >
                  <SelectTrigger className="w-1/2 text-end">
                    <SelectValue>{FontSizes[preferences.fontSize]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">{FontSizes.default}</SelectItem>
                    <SelectItem value="medium">{FontSizes.medium}</SelectItem>
                    <SelectItem value="large">{FontSizes.large}</SelectItem>
                  </SelectContent>
                </Select>
              </SettingsItem>
            </Card>
          </PaddingBox>
        </MainContainer>
      </AnimatedLayout>
    </MainContainer>
  );
};

export default PreferencesPage;

type SettingsItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const SettingsItem = ({ children, onClick }: SettingsItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center gap-3 px-1 py-3 border-b border-gray-200`}
    >
      {children}
    </div>
  );
};
