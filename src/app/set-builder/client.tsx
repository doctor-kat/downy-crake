"use client";

import { useEffect, useState } from "react";
import { Stack, Container, Title, Text, Alert, Loader, Badge, Group, Button } from "@mantine/core";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import { Armor } from "@/app/api/mhdb/armor/Armor";
import { SkillTreeNavigator } from "@/lib/skill-tree/navigator";
import { loadSkillTree } from "@/lib/skill-tree/loader";
import SkillSelector from "./SkillSelector";
import CombinationResults from "./CombinationResults";

interface Props {
  skills: Skill[];
  armors: Armor[];
}

export default function SetBuilderClient({ skills, armors }: Props) {
  const [navigator, setNavigator] = useState<SkillTreeNavigator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<Map<number, number>>(new Map());
  const [combinationCount, setCombinationCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Load skill tree on mount
  useEffect(() => {
    loadSkillTree()
      .then((tree) => {
        const nav = new SkillTreeNavigator(tree);
        setNavigator(nav);
        const state = nav.getState();
        setSelectedSkills(state.selectedSkills);
        setCombinationCount(state.combinationCount);
        setIsComplete(state.isComplete);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSkillSelect = (skillId: number, level: number) => {
    if (!navigator) return;

    const success = navigator.selectSkill(skillId, level);

    if (success) {
      const state = navigator.getState();
      setSelectedSkills(state.selectedSkills);
      setCombinationCount(state.combinationCount);
      setIsComplete(state.isComplete);
    }
  };

  const handleSkillDeselect = (skillId: number) => {
    if (!navigator) return;

    navigator.deselectSkill(skillId);
    const state = navigator.getState();
    setSelectedSkills(state.selectedSkills);
    setCombinationCount(state.combinationCount);
    setIsComplete(state.isComplete);
  };

  const handleClearAll = () => {
    if (!navigator) return;

    navigator.clearSelections();
    const state = navigator.getState();
    setSelectedSkills(state.selectedSkills);
    setCombinationCount(state.combinationCount);
    setIsComplete(state.isComplete);
  };

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text>Loading skill tree...</Text>
        </Stack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="xl" py="xl">
        <Alert color="red" title="Error loading skill tree">
          {error}
          <Text size="sm" mt="sm">
            Please run <code>pnpm generate:tree</code> to generate the skill tree data.
          </Text>
        </Alert>
      </Container>
    );
  }

  if (!navigator) {
    return (
      <Container size="xl" py="xl">
        <Alert color="red">Failed to initialize skill tree navigator</Alert>
      </Container>
    );
  }

  const possibleSkills = navigator.getPossibleSkills();
  const combinations = isComplete ? navigator.getCombinations() : [];

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <div>
          <Title order={1}>Set Builder</Title>
          <Text c="dimmed">
            Select skills to narrow down armor combinations. The tree will update to show only
            achievable skills based on your selections.
          </Text>
        </div>

        {/* Selected skills */}
        {selectedSkills.size > 0 && (
          <div>
            <Group gap="xs" mb="xs">
              <Text fw={500}>Selected Skills:</Text>
              <Button size="xs" variant="subtle" onClick={handleClearAll}>
                Clear All
              </Button>
            </Group>
            <Group gap="xs">
              {Array.from(selectedSkills.entries()).map(([skillId, level]) => {
                const skill = skills.find((s) => s.id === skillId);
                return (
                  <Badge
                    key={skillId}
                    size="lg"
                    variant="filled"
                    rightSection={
                      <Text
                        size="xs"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSkillDeselect(skillId)}
                      >
                        ×
                      </Text>
                    }
                  >
                    {skill?.name || `Skill ${skillId}`} Lv{level}
                  </Badge>
                );
              })}
            </Group>
          </div>
        )}

        {/* Combination count */}
        <Alert color={isComplete ? "green" : "blue"} title="Combinations">
          {isComplete ? (
            <Text>
              Found <strong>{combinationCount}</strong> matching combinations. Showing results below.
            </Text>
          ) : (
            <Text>
              <strong>{combinationCount.toLocaleString()}</strong> possible combinations. Keep
              selecting skills to narrow down to 25 or fewer.
            </Text>
          )}
        </Alert>

        {/* Skill selector */}
        {!isComplete && (
          <SkillSelector
            skills={skills}
            possibleSkills={possibleSkills}
            onSelectSkill={handleSkillSelect}
          />
        )}

        {/* Results */}
        {isComplete && combinations.length > 0 && (
          <CombinationResults combinations={combinations} armors={armors} />
        )}
      </Stack>
    </Container>
  );
}
