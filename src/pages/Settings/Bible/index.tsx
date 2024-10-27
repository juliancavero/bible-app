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
import useBibleSettings from "./useBibleSettings";

const BibleSettingsPage = () => {
  const {
    goBack,
    version,
    bibleVersions,
    paddingOptions,
    biblePadding,
    changeBiblePadding,
    changeBibleVersion,
    renderBibleVersion,
  } = useBibleSettings();
  return (
    <MainContainer>
      <IndexBar text="Ajustes - La Biblia" onClick={goBack} />
      <AnimatedLayout>
        <MainContainer>
          <PaddingBox className="flex flex-col gap-3">
            <Card>
              <SettingsItem>
                <BodyText>Versión</BodyText>
                <Select value={version} onValueChange={changeBibleVersion}>
                  <SelectTrigger className="w-2/3 text-end">
                    <SelectValue>{renderBibleVersion}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {bibleVersions.map((version) => (
                      <SelectItem key={version.value} value={version.value}>
                        {version.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </SettingsItem>
              <SettingsItem>
                <BodyText>Espaciado de página</BodyText>
                <Select value={biblePadding} onValueChange={changeBiblePadding}>
                  <SelectTrigger className="w-2/3 text-end">
                    <SelectValue>{biblePadding.valueOf()}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {paddingOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
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

export default BibleSettingsPage;

type SettingsItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const SettingsItem = ({ children, onClick }: SettingsItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center gap-3 py-3 px-1 border-b border-gray-200`}
    >
      {children}
    </div>
  );
};
