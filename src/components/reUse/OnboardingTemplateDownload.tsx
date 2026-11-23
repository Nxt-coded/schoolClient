const OnboardingTemplateDownload = () => (
  <div className="my-2 flex justify-end px-2">
    <p className="text-right text-xs text-gray-600">
      <a
        href="/templates/School_Onboarding_Bulk_Data_Template.docx"
        download
        className="font-semibold text-blue-800 underline"
      >
        Download the Word onboarding form
      </a>
      <span> (for collecting data; bulk uploads still require CSV files.)</span>
    </p>
  </div>
);

export default OnboardingTemplateDownload;
