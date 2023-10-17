import type { Channel } from "@/modules/apps/types";
import { type Column, Table, Row, Cell } from "@/components/Table";
import Link from "next/link";

type ChannelsTableProps = {
  applicationId: string;
  items?: Channel[];
  loading: boolean;
}

const columns: Column[] = [
  {
    value: 'Name',
    class: 'w-70'
  },
  {
    value: 'Subscribed Count',
    class: 'w-20'
  },
]

export const ChannelsTable = ({ applicationId, items, loading }: ChannelsTableProps) => {
  return (
    <Table columns={columns} loading={loading}>
      {!loading && items?.length === 0 && (
        <Row>
          <Cell colSpan={columns.length}>No channels found.</Cell>
        </Row>
      )}
      {
        items?.map(channel => {
          return (
            <Row key={channel.name}>
              <Cell>
                <Link href={`/application/${applicationId}/${channel.name}`} className="underline decoration-dotted whitespace-nowrap">{channel.name}</Link>
              </Cell>
              <Cell>{channel.users}</Cell>
            </Row>
          )
        })
      }
    </Table>
  );
}