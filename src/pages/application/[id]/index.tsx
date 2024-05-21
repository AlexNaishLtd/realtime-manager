import { Layout } from "@/layouts/Layout";
import { ChannelsTable } from "@/modules/apps/channels-table";
import { trpc } from "@/utils/api";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AppPage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const router = useRouter();
  const applicationId = router.query.id as string;
  const appQuery = trpc.apps.fetch.useQuery(applicationId, { enabled: !!applicationId });
  const channelsQuery = trpc.apps.getChannels.useQuery(applicationId, {
    enabled: !!applicationId,
    refetchInterval: 20000
  });

  useEffect(() => {
    if (!channelsQuery.data) return;
    setTotalUsers(
      channelsQuery.data.reduce<number>((acc, item) => {
        return acc + item.users;
      }, 0)
    );
  }, [channelsQuery.data, setTotalUsers]);

  const pageTitle = `${appQuery.data?.AppName || ''} Application | Realtime Manager`;

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <h1 className="mt-10 text-lg font-medium">{appQuery.data?.AppName} Application</h1>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 mt-2 lg:col-span-8">
          Application Details
        </div>
        <div className="col-span-12 mt-2 sm:col-span-6 lg:col-span-4">
          Total Users: {totalUsers}
        </div>
        <div className="col-span-12">
          <h2 className="mt-6 text-md font-medium">Channel List</h2>
          <ChannelsTable applicationId={applicationId} items={channelsQuery.data} loading={channelsQuery.isLoading} />
        </div>
      </div>
    </Layout>
  )
}

export default AppPage;