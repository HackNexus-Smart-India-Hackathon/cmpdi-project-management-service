const generateProjectCode = async (fundingSource) => {
  const prefix = fundingSource === "S&T" ? "SNT" : "RND";
  const year = new Date().getFullYear();
  const lastProject = await Project.findOne({
    where: { fundingSource },
    order: [["createdAt", "DESC"]],
  });

  const lastNumber = lastProject
    ? parseInt(lastProject.projectCode.split("-")[2])
    : 0;
  const nextNumber = String(lastNumber + 1).padStart(3, "0");

  return `${prefix}-${year}-${nextNumber}`;
};
