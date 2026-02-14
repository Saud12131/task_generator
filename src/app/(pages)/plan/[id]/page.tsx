import PlanView from "@/src/components/plan-view";

export default async function PlanPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return <PlanView id={id} />;
}
