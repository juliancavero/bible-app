import useAchievements from "@/hooks/useAchievements";
import useNav from "@/hooks/useNav";

const useAllAchievements = () => {
  const { achievements } = useAchievements();
  const { goBack } = useNav();

  return {
    goBack,
    achievements,
  };
};

export default useAllAchievements;
