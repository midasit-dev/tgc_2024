import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SvgCode, SvgLoading } from "../../../../Svg";
import { useRecoilValue } from "recoil";
import { AppSchemaStateForExport } from "../../../../../recoilState";
import { transformSchemaToExportCodes, ExportCodes } from "@midasit-dev/playground";
import { enqueueSnackbar } from "notistack";
import onClickHandler from "../../../../../Tools/Shared/OnClickHandler";
import { getCurrentTime } from "../../../../../Tools/Shared/GetCurrentTime";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const App = () => {
  const appSchemaStateForExport = useRecoilValue(AppSchemaStateForExport);

  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    const loadSchemaHandler = async () => {
      try {
				const exportCodes: ExportCodes = transformSchemaToExportCodes(appSchemaStateForExport);
				const json = JSON.stringify(exportCodes, null, 2);
				const curTime = getCurrentTime();
				const curTimeStr = `${curTime.year}${curTime.month}${curTime.day}-${curTime.hour}h-${curTime.minute}m-${curTime.second}s`;
				const curFileName = `code_${curTimeStr}.json`;
					const data = await onClickHandler({
						path: '/exports/codes',
						body: {
							fileName: curFileName,
							content: json,
						},
						method: 'post',
					});

					if (data.message) {
						enqueueSnackbar(data.message, { variant: 'success' });
					}
      } catch (err) {
        console.error("Error occurred while saving code:", err);
      } finally {
        setIsClicked(false);
      }
    };

    if (isClicked) {
      setTimeout(loadSchemaHandler, 1000);
    }
  }, [appSchemaStateForExport, isClicked]);

  return (
    <motion.li
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="m-0 p-0 list-none mb-5 flex items-center cursor-pointer"
      onClick={() => setIsClicked(true)}
    >
      {isClicked && (
        <motion.div
          className="w-5 h-5 flex-[20px 0] items-center cursor-default mr-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <SvgLoading />
        </motion.div>
      )}

      {!isClicked && (
        <div className="w-5 h-5 flex-[20px 0] items-center mr-5">
          <SvgCode />
        </div>
      )}

      <motion.p
        className="flex-[1] text-md"
        animate={{ opacity: 1, color: isClicked ? "#fff" : "#9C1AFF" }}
      >
        Code Save
      </motion.p>
    </motion.li>
  );
};

export default App;
