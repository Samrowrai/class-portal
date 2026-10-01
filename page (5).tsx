import { routine } from "@/lib/config";
export default function Routine() {
  return (
    <main className="container"><h1>Class Routine</h1>
      <div className="table-wrap"><table><thead><tr><th>Day</th><th colSpan={4}>Periods</th></tr></thead>
        <tbody>{routine.map((r) => <tr key={r.day}><th>{r.day}</th>{r.periods.map((p, i) => <td key={i}>{p}</td>)}</tr>)}</tbody></table></div>
    </main>
  );
}
