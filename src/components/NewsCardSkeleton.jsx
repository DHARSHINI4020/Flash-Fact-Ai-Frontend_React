import React from "react";
import { Card, CardContent, Skeleton } from "@mui/material";

const NewsCardSkeleton = () => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Image placeholder */}
      <Skeleton variant="rectangular" height={140} animation="wave" />

      <CardContent sx={{ flexGrow: 1 }}>
        {/* Title */}
        <Skeleton variant="text" width="80%" height={30} animation="wave" />
        {/* Description */}
        <Skeleton variant="text" width="100%" height={20} animation="wave" />
        <Skeleton variant="text" width="90%" height={20} animation="wave" />
        {/* Bottom actions */}
        <Skeleton
          variant="rectangular"
          width="40%"
          height={25}
          sx={{ mt: 2 }}
          animation="wave"
        />
      </CardContent>
    </Card>
  );
};

export default NewsCardSkeleton;
