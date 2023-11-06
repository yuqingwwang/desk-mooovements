import supabase from "../app/config/supabaseclient";

export async function SupabaseCall(
  callFrom: string,
  selectThis: string,
  columnName: string,
  columnCriteria: any
) {
  columnName = columnName ? columnName : "";
  columnCriteria = columnCriteria ? columnCriteria : "";
  console.log(typeof columnName);
  let fetchError: string | null = null;
  const { data, error } = await supabase
    .from(callFrom)
    .select(selectThis)
    .eq(columnName, columnCriteria);
  if (error) {
    fetchError = `Could not fetch the ${callFrom}`;
    console.log(error);
    return null;
  }
  console.log({ tableName: callFrom, select: selectThis, data: data });
  return data as any[];
}
