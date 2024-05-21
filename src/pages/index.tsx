import type { App } from "@/modules/apps/types";
import Head from "next/head";
import SearchIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';

import { Layout } from "@/layouts/Layout";
import { useListPage } from "@/hooks/useListPage";
import { trpc } from '@/utils/api';
import { SideOverlay } from "@/components/SideOverlay";
import { Alert } from "@/components/Alert";
import { CreateAppForm } from "@/modules/apps/create-form";
import { ApplicationsTable } from "@/modules/apps/apps-table";
import { useDebounced } from "@/hooks/useDebounced";

export default function Home() {
  const { actions, state } = useListPage<App>();
  const searchFilter = useDebounced(actions.setSearch);
  const utils = trpc.useContext();
  const createApplication = trpc.apps.create.useMutation({
    onSettled: async () => {
      await utils.apps.getAll.invalidate();
    }
  });
  const { data, isLoading, error } = trpc.apps.getAll.useQuery(
    {
      limit: 20,
    }
  );

  return (
    <Layout>
      <Head>
        <title>Home | Realtime Manager</title>
      </Head>
      <h1 className="mt-10 text-lg font-medium">Application List</h1>
      <div className="grid gap-6 mt-5">
        <div className="flex flex-wrap gap-2 items-center col-span-12 mt-2 sm:flex-nowrap">
          <button onClick={() => actions.setCreating()} className="transition duration-200 border inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none bg-primary border-primary text-sm text-white mr-2 shadow-md">Add New Application</button>
          <div className="w-full sm:w-auto ml-auto">
            <div className="relative w-56 text-slate-500">
              <input
                className="transition duration-200 ease-in-out text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 w-56 pr-10" type="text" placeholder="Search..."
                onChange={(ev) => { searchFilter(ev.target.value) }} />
              <SearchIcon className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3" />
            </div>
          </div>
        </div>
        <div className="col-span-12 overflow-auto 2xl:overflow-visible">
          {error && <Alert
            title="Unable to retrieve applications."
            description={error?.message}
          />}
          <ApplicationsTable
            items={data}
            loading={isLoading}
          />
        </div>
      </div>
      <SideOverlay
        isOpen={state.isCreating}
        title="Create New Application"
        onClose={() => actions.clearCreating()}
      >
        <CreateAppForm onSubmit={async (values) => {
          await createApplication.mutateAsync(values);
          actions.clearCreating();
        }} />
      </SideOverlay>
    </Layout>
  );
}