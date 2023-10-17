import EditIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import DeleteIcon from '@heroicons/react/24/outline/TrashIcon';

import { CopyButton } from "@/components/CopyButton";
import { SwitchGroup } from "@/components/Form/switch";
import { type Column, Table, Row, Cell } from "@/components/Table";
import type { App } from "@/modules/apps/types";
import { success } from "@/utils/toast";
import Link from 'next/link';

type ApplicationsTableProps = {
  items?: App[];
  loading: boolean;
}

const columns: Column[] = [
  {
    value: 'ID',
    class: 'w-60'
  },
  {
    value: 'Name',
    class: 'w-40'
  },
  {
    value: 'Key',
    class: 'w-720'
  },
  {
    value: 'Secret',
    class: 'w-72'
  },
  {
    value: 'Active',
    class: 'w-24'
  },
  {
    value: '',
    class: 'w-30'
  },
]

export const ApplicationsTable = ({ items, loading }: ApplicationsTableProps) => {
  const onCopy = async () => {
    success('Value copied to clipboard');
  };

  return (
    <Table columns={columns} loading={loading}>
      {!loading && items?.length === 0 && (
        <Row>
          <Cell colSpan={columns.length}>No applications found.</Cell>
        </Row>
      )}
      {
        items?.map(app => {
          return (
            <Row key={app.id}>
              <Cell>
                <Link href={`/application/${app.id}`} className="underline decoration-dotted whitespace-nowrap">{app.id}</Link>
              </Cell>
              <Cell>{app.name}</Cell>
              <Cell>
                <CopyButton
                  text={app.key}
                  value={app.key}
                  onCopy={onCopy} />
              </Cell>
              <Cell>
                <CopyButton
                  text={app.secret}
                  value={app.secret}
                  onCopy={onCopy} />
              </Cell>
              <Cell>
                <SwitchGroup value={app.enabled} />
              </Cell>
              <Cell isActions>
                <div className="flex items-center justify-center">
                  <button className="flex items-center p-2 rounded mr-3 transition hover:bg-amber-600 hover:text-white">
                    <EditIcon className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button className="flex items-center p-2 rounded mr-3 transition hover:bg-red-600 hover:text-white">
                    <DeleteIcon className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </Cell>
            </Row>
          )
        })
      }
    </Table>
  );
}