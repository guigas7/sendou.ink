import { Avatar, Box, Flex, Link as ChakraLink, Text } from "@chakra-ui/core";
import { Link } from "@reach/router";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  GetXRankLeaderboardDocument,
  useGetXRankLeaderboardQuery,
  XRankLeaderboardType,
} from "../../generated/graphql";
import MyThemeContext from "../../themeContext";
import { getPlacementString } from "../../utils/helperFunctions";
import Error from "../common/Error";
import Pagination from "../common/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../common/Table";

interface PeakXPowerLeaderboardProps {
  type: XRankLeaderboardType;
}

const XRankScoreLeaderboard: React.FC<PeakXPowerLeaderboardProps> = ({
  type,
}) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const {
    previousData,
    data = previousData,
    error,
    client,
  } = useGetXRankLeaderboardQuery({
    variables: { type, page },
  });
  const { themeColorWithShade } = useContext(MyThemeContext);

  client.query({
    query: GetXRankLeaderboardDocument,
    variables: { page: page + 1, type },
  });

  if (error) return <Error errorMessage={error.message} />;

  return (
    <>
      <Box my={4}>
        <Pagination
          currentPage={page}
          pageCount={data?.getXRankLeaderboard.pageCount ?? 1}
          onChange={setPage}
        />
      </Box>
      <Table maxW="50rem">
        <TableHead>
          <TableRow>
            {page === 1 && <TableHeader w={1} />}
            <TableHeader>Name</TableHeader>
            <TableHeader>Score</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.getXRankLeaderboard.records.map(
              (record, index, allRecords) => {
                return (
                  <TableRow key={record.playerId}>
                    {page === 1 && (
                      <TableCell>
                        {(index === 0 ||
                          record.score !== allRecords[index - 1].score) && (
                          <Text fontWeight="bold" fontSize="sm">
                            {getPlacementString(index + 1)}
                          </Text>
                        )}
                      </TableCell>
                    )}
                    <TableCell>
                      {record.user ? (
                        <Flex alignItems="center">
                          <ChakraLink
                            as={Link}
                            color={themeColorWithShade}
                            to={record.user.profilePath}
                          >
                            <Avatar
                              src={record.user.avatarUrl}
                              size="sm"
                              name={record.user.fullUsername}
                              mr="0.5rem"
                            />
                          </ChakraLink>
                          {record.user.fullUsername}
                        </Flex>
                      ) : (
                        <>{record.playerName}</>
                      )}
                    </TableCell>
                    <TableCell>{record.score}</TableCell>
                  </TableRow>
                );
              }
            )}
        </TableBody>
      </Table>
      <Box my={4}>
        <Pagination
          currentPage={page}
          pageCount={data?.getXRankLeaderboard.pageCount ?? 1}
          onChange={setPage}
          scrollToTop
        />
      </Box>
    </>
  );
};

export default XRankScoreLeaderboard;