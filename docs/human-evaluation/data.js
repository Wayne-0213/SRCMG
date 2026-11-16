// Generated with tools/prepare_human_evaluation.py; do not reorder candidates.
window.SRCMG_EVALUATION = {
  "meta": {
    "generated_at": "2026-04-08T03:06:45.690985+00:00",
    "seed": 20260407,
    "sample_size_per_lang": 25,
    "total_questions": 50,
    "score_scale": {
      "min": 1,
      "max": 5
    },
    "methods": [
      "COME",
      "ERICommiter",
      "NNGen",
      "SRCMG",
      "Sanker"
    ],
    "dataset_id": "srcmg-rq1-58f2e3d3a7697285"
  },
  "questions": [
    {
      "language": "python",
      "commit_id": "342ff6eb4152d84ba3f381365f8fc8706460e8a8",
      "gold_msg": "Update comments in class BatchEncoding ()",
      "code_change": "diff --git a/src/transformers/tokenization_utils_base.py b/src/transformers/tokenization_utils_base.py\nindex c7f76c91ddac7..c76197f544778 100644\n--- a/src/transformers/tokenization_utils_base.py\n+++ b/src/transformers/tokenization_utils_base.py\n@@ -160,16 +160,17 @@ class TokenSpan(NamedTuple):\n \n class BatchEncoding(UserDict):\n     \"\"\"\n-    Holds the output of the [`~tokenization_utils_base.PreTrainedTokenizerBase.encode_plus`] and\n-    [`~tokenization_utils_base.PreTrainedTokenizerBase.batch_encode`] methods (tokens, attention_masks, etc).\n+    Holds the output of the [`~tokenization_utils_base.PreTrainedTokenizerBase.__call__`],\n+    [`~tokenization_utils_base.PreTrainedTokenizerBase.encode_plus`] and\n+    [`~tokenization_utils_base.PreTrainedTokenizerBase.batch_encode_plus`] methods (tokens, attention_masks, etc).\n \n     This class is derived from a python dictionary and can be used as a dictionary. In addition, this class exposes\n     utility methods to map from word/character space to token space.\n \n     Args:\n         data (`dict`):\n-            Dictionary of lists/arrays/tensors returned by the encode/batch_encode methods ('input_ids',\n-            'attention_mask', etc.).\n+            Dictionary of lists/arrays/tensors returned by the `__call__`/`encode_plus`/`batch_encode_plus` methods\n+            ('input_ids', 'attention_mask', etc.).\n         encoding (`tokenizers.Encoding` or `Sequence[tokenizers.Encoding]`, *optional*):\n             If the tokenizer is a fast tokenizer which outputs additional information like mapping from word/character\n             space to token space the `tokenizers.Encoding` instance or list of instance (for batches) hold this",
      "candidates": [
        {
          "method": "ERICommiter",
          "text": "Refactor BatchEncoding class to include __call__ method in docstring and clarify method references ()",
          "label": "A"
        },
        {
          "method": "SRCMG",
          "text": "Fix `BatchEncoding` docstring to include recently added tokenizer methods",
          "label": "B"
        },
        {
          "method": "Sanker",
          "text": "\"Update BatchEncoding docstring to include `__call__` method and `batch_encode_plus`\"",
          "label": "C"
        },
        {
          "method": "NNGen",
          "text": "fix `word_to_tokens` docstring format ()",
          "label": "D"
        },
        {
          "method": "COME",
          "text": "Fix `BatchEncoding` docstring ()",
          "label": "E"
        }
      ],
      "question_id": 1
    },
    {
      "language": "java",
      "commit_id": "9b2ccd43c805eba8569ae5de3ddffe2d6991691e",
      "gold_msg": "Make radio-row preview interactive.",
      "code_change": "diff --git a/core-ui/src/main/java/org/signal/core/ui/Rows.kt b/core-ui/src/main/java/org/signal/core/ui/Rows.kt\nindex f973843f9c4..0c09231de89 100644\n--- a/core-ui/src/main/java/org/signal/core/ui/Rows.kt\n+++ b/core-ui/src/main/java/org/signal/core/ui/Rows.kt\n@@ -1,5 +1,6 @@\n package org.signal.core.ui\n \n+import androidx.compose.foundation.clickable\n import androidx.compose.foundation.layout.Row\n import androidx.compose.foundation.layout.fillMaxWidth\n import androidx.compose.foundation.layout.padding\n@@ -7,6 +8,10 @@ import androidx.compose.material3.MaterialTheme\n import androidx.compose.material3.RadioButton\n import androidx.compose.material3.Text\n import androidx.compose.runtime.Composable\n+import androidx.compose.runtime.getValue\n+import androidx.compose.runtime.mutableStateOf\n+import androidx.compose.runtime.remember\n+import androidx.compose.runtime.setValue\n import androidx.compose.ui.Alignment\n import androidx.compose.ui.Modifier\n import androidx.compose.ui.res.dimensionResource\n@@ -52,6 +57,14 @@ object Rows {\n @Composable\n private fun RadioRowPreview() {\n   SignalTheme(isDarkMode = false) {\n-    Rows.RadioRow(true, \"RadioRow\")\n+    var selected by remember { mutableStateOf(true) }\n+\n+    Rows.RadioRow(\n+      selected,\n+      \"RadioRow\",\n+      modifier = Modifier.clickable {\n+        selected = !selected\n+      }\n+    )\n   }\n }",
      "candidates": [
        {
          "method": "SRCMG",
          "text": "Fix RadioRow preview.",
          "label": "A"
        },
        {
          "method": "Sanker",
          "text": "\"Add clickable functionality to RadioRow in Row preview\"",
          "label": "B"
        },
        {
          "method": "ERICommiter",
          "text": "Add clickable toggle to RadioRow preview.\n\nEnhance the `RadioRow` preview functionality by introducing a toggle mechanism. This update allows users to click on the preview to change the selection state dynamically. The state management is handled using Compose's `remember`",
          "label": "C"
        },
        {
          "method": "NNGen",
          "text": "Fix RadioRow vertical alignment.",
          "label": "D"
        },
        {
          "method": "COME",
          "text": "Fix RadioRow visibility.",
          "label": "E"
        }
      ],
      "question_id": 2
    },
    {
      "language": "java",
      "commit_id": "6c42ded2b1367effd7846808fdc2f8093e29fb5a",
      "gold_msg": "Update recyclerview dependency version to 1.2.1",
      "code_change": "diff --git a/dependencies.gradle b/dependencies.gradle\nindex 51fa1c233b2..2d247d9df90 100644\n--- a/dependencies.gradle\n+++ b/dependencies.gradle\n@@ -25,7 +25,7 @@ dependencyResolutionManagement {\n             alias('androidx-appcompat').to('androidx.appcompat:appcompat:1.2.0')\n             alias('androidx-constraintlayout').to('androidx.constraintlayout:constraintlayout:2.0.4')\n             alias('androidx-window').to('androidx.window:window:1.0.0-alpha09')\n-            alias('androidx-recyclerview').to('androidx.recyclerview:recyclerview:1.1.0')\n+            alias('androidx-recyclerview').to('androidx.recyclerview:recyclerview:1.2.1')\n             alias('androidx-legacy-support').to('androidx.legacy:legacy-support-v13:1.0.0')\n             alias('androidx-legacy-preference').to('androidx.legacy:legacy-preference-v14:1.0.0')\n             alias('androidx-cardview').to('androidx.cardview:cardview:1.0.0')",
      "candidates": [
        {
          "method": "ERICommiter",
          "text": "[Internal][Gradle] (deps): Upgrade androidx.recyclerview from 1.1.0 to 1.2.1 in dependencies.gradle\n\n- Updated the androidx.recyclerview dependency to version 1.2.1 to leverage the latest features and",
          "label": "A"
        },
        {
          "method": "Sanker",
          "text": "\"Update androidx.recyclerview to 1.2.1\"",
          "label": "B"
        },
        {
          "method": "NNGen",
          "text": "Update dependency androidx.exifinterface:exifinterface to v1.3.6",
          "label": "C"
        },
        {
          "method": "COME",
          "text": "Update dependencies.gradle",
          "label": "D"
        },
        {
          "method": "SRCMG",
          "text": "[Gradle] Bump androidx-recyclerview from 1.1.0 to 1.2.1",
          "label": "E"
        }
      ],
      "question_id": 3
    },
    {
      "language": "python",
      "commit_id": "e5f9798b171e791cc42be1ba4b20c89a88a9a187",
      "gold_msg": "DOC: don't advocate deleting main branch",
      "code_change": "diff --git a/doc/devel/development_workflow.rst b/doc/devel/development_workflow.rst\nindex c4f8a66c23ad..85b6408a6cb7 100644\n--- a/doc/devel/development_workflow.rst\n+++ b/doc/devel/development_workflow.rst\n@@ -13,7 +13,7 @@ To keep your work well organized, with readable history, and in turn make it\n easier for project maintainers (that might be you) to see what you've done, and\n why you did it, we recommend the following:\n \n-* Don't make changes in your local ``main`` branch! Consider deleting it.\n+* Don't make changes in your local ``main`` branch!\n * Before starting a new set of changes, fetch all changes from\n   ``upstream/main``, and start a new *feature branch* from that.\n * Make a new branch for each feature or bug fix — \"one task, one branch\".\n@@ -25,14 +25,6 @@ why you did it, we recommend the following:\n   Matplotlib developers can give feedback and eventually include your suggested\n   code into the ``main`` branch.\n \n-.. note::\n-\n-   It may sound strange, but deleting your own ``main`` branch can help reduce\n-   confusion about which branch you are on.  See `deleting main on GitHub`_ for\n-   details.\n-\n-.. _deleting main on GitHub: https://matthew-brett.github.io/pydagogue/gh_delete_master.html\n-\n .. _update-mirror-main:\n \n Update the ``main`` branch",
      "candidates": [
        {
          "method": "COME",
          "text": "Update doc/devel/development_workflow.rst",
          "label": "A"
        },
        {
          "method": "Sanker",
          "text": "\"Remove suggestion to delete local main branch from development workflow documentation\"",
          "label": "B"
        },
        {
          "method": "ERICommiter",
          "text": "DOC: Simplify instructions for local `main` branch management\n\nThis commit removes the suggestion to delete the local `main` branch from the development workflow documentation. The intention is to simplify the guidelines for contributors and reduce potential confusion about branch management. The",
          "label": "C"
        },
        {
          "method": "NNGen",
          "text": "emphasize local",
          "label": "D"
        },
        {
          "method": "SRCMG",
          "text": "emphasize local main branch",
          "label": "E"
        }
      ],
      "question_id": 4
    },
    {
      "language": "python",
      "commit_id": "d9e9820e219d5bba84a446f893f2478b06a7948b",
      "gold_msg": "Move the buttonlights to diagnostic entities ()",
      "code_change": "diff --git a/homeassistant/components/velbus/light.py b/homeassistant/components/velbus/light.py\nindex f1a9065171688c..e0d1b797bb3f8d 100644\n--- a/homeassistant/components/velbus/light.py\n+++ b/homeassistant/components/velbus/light.py\n@@ -22,7 +22,7 @@\n )\n from homeassistant.config_entries import ConfigEntry\n from homeassistant.core import HomeAssistant\n-from homeassistant.helpers.entity import Entity\n+from homeassistant.helpers.entity import Entity, EntityCategory\n from homeassistant.helpers.entity_platform import AddEntitiesCallback\n \n from . import VelbusEntity\n@@ -96,6 +96,7 @@ class VelbusButtonLight(VelbusEntity, LightEntity):\n \n     _channel: VelbusButton\n     _attr_entity_registry_enabled_default = False\n+    _attr_entity_category = EntityCategory.DIAGNOSTIC\n     _attr_supported_features = SUPPORT_FLASH\n \n     def __init__(self, channel: VelbusChannel) -> None:",
      "candidates": [
        {
          "method": "Sanker",
          "text": "\"Add entity category to Velbus button lights\"\n\nThis commit message is short and descriptive, it clearly states what change was made to the code, which is adding an entity category to Velbus button lights.",
          "label": "A"
        },
        {
          "method": "ERICommiter",
          "text": "Mark Velbus Button Light as diagnostic\n\n- Added `EntityCategory.DIAGNOSTIC` to `VelbusButtonLight` class to categorize it as a diagnostic entity.\n- This change helps in differentiating diagnostic entities from regular entities within the Vel",
          "label": "B"
        },
        {
          "method": "COME",
          "text": "Migrate velbus light to entity_category ()",
          "label": "C"
        },
        {
          "method": "NNGen",
          "text": "Use ColorMode enum in unifiprotect ()",
          "label": "D"
        },
        {
          "method": "SRCMG",
          "text": "Set entity category for Velbus button light as diagnostic",
          "label": "E"
        }
      ],
      "question_id": 5
    },
    {
      "language": "python",
      "commit_id": "83ecdf1bcab310be5f2c59e5c005b8968d72a72c",
      "gold_msg": "Update docs/topics/components.rst",
      "code_change": "diff --git a/docs/topics/components.rst b/docs/topics/components.rst\nindex 1fff2d61a73..c44f3def207 100644\n--- a/docs/topics/components.rst\n+++ b/docs/topics/components.rst\n@@ -47,7 +47,7 @@ Enforcing component requirements\n ================================\n \n Sometimes, your components may only be intended to work under certain\n-conditions. For example, the may require a minimum version of Scrapy to work as\n+conditions. For example, they may require a minimum version of Scrapy to work as\n intended, or they may require certain settings to have specific values.\n \n In addition to describing those conditions in the documentation of your",
      "candidates": [
        {
          "method": "Sanker",
          "text": "\"Fix typo in components documentation\"",
          "label": "A"
        },
        {
          "method": "NNGen",
          "text": "DOC Add section to contributing.rst on cross referencing syntax ()",
          "label": "B"
        },
        {
          "method": "SRCMG",
          "text": "docs: fix typo ('the' → 'they') in component requirements",
          "label": "C"
        },
        {
          "method": "COME",
          "text": "Update docs/topics/components.rst",
          "label": "D"
        },
        {
          "method": "ERICommiter",
          "text": "Fix typo in `components.rst`: Change \"the may require\" to \"they may require\".",
          "label": "E"
        }
      ],
      "question_id": 6
    },
    {
      "language": "python",
      "commit_id": "34722270741fb9c06f978861c1e5f503291070d8",
      "gold_msg": "[rutv] fix vbr for empty string value ()",
      "code_change": "diff --git a/youtube_dl/extractor/rutv.py b/youtube_dl/extractor/rutv.py\nindex d2713c19a05..05f3193968c 100644\n--- a/youtube_dl/extractor/rutv.py\n+++ b/youtube_dl/extractor/rutv.py\n@@ -6,7 +6,8 @@\n from .common import InfoExtractor\n from ..utils import (\n     ExtractorError,\n-    int_or_none\n+    int_or_none,\n+    str_to_int\n )\n \n \n@@ -179,7 +180,7 @@ def _real_extract(self, url):\n                         'player_url': 'http://player.rutv.ru/flash3v/osmf.swf?i=22',\n                         'rtmp_live': True,\n                         'ext': 'flv',\n-                        'vbr': int(quality),\n+                        'vbr': str_to_int(quality),\n                         'preference': preference,\n                     }\n                 elif transport == 'm3u8':",
      "candidates": [
        {
          "method": "ERICommiter",
          "text": "Add str_to_int conversion for vbr in rutv.py\n\nThis commit updates the `rutv.py` extractor to use `str_to_int` for the `vbr` (video bitrate) conversion instead of directly casting it to an integer.",
          "label": "A"
        },
        {
          "method": "NNGen",
          "text": "[infoq] Avoid crash if the page has no `mp3Form`",
          "label": "B"
        },
        {
          "method": "Sanker",
          "text": "Fix extraction by converting quality to integer using str_to_int in rutv extractor",
          "label": "C"
        },
        {
          "method": "COME",
          "text": "Use str_to_int instead of str_or_none",
          "label": "D"
        },
        {
          "method": "SRCMG",
          "text": "[extractor/rutv] Fix video_bitrate extraction by converting string quality values",
          "label": "E"
        }
      ],
      "question_id": 7
    },
    {
      "language": "java",
      "commit_id": "579b8611be4bcb30cccdc90ba62ec3d9ef9788a3",
      "gold_msg": "Change compileSdk from 30 to 31",
      "code_change": "diff --git a/app/build.gradle b/app/build.gradle\nindex 0c37a960f66..a441a27ebf0 100644\n--- a/app/build.gradle\n+++ b/app/build.gradle\n@@ -8,7 +8,7 @@ plugins {\n }\n \n android {\n-    compileSdk 30\n+    compileSdk 31\n     buildToolsVersion '30.0.3'\n \n     defaultConfig {",
      "candidates": [
        {
          "method": "Sanker",
          "text": "\"Update compileSdk to 31\"",
          "label": "A"
        },
        {
          "method": "NNGen",
          "text": "app/build.grade: compileSdk 30 -> 31",
          "label": "B"
        },
        {
          "method": "COME",
          "text": "app/build.grade: compileSdk 30 -> 31",
          "label": "C"
        },
        {
          "method": "SRCMG",
          "text": "Update compileSdk to 31",
          "label": "D"
        },
        {
          "method": "ERICommiter",
          "text": "Update compileSdk version to 31 in build.gradle.",
          "label": "E"
        }
      ],
      "question_id": 8
    },
    {
      "language": "java",
      "commit_id": "085565a771270f7a124186e7691381534018dd03",
      "gold_msg": "Skip class transformer in PersistenceUnitInfoDescriptor for native images",
      "code_change": "diff --git a/spring-orm/src/main/java/org/springframework/orm/jpa/vendor/SpringHibernateJpaPersistenceProvider.java b/spring-orm/src/main/java/org/springframework/orm/jpa/vendor/SpringHibernateJpaPersistenceProvider.java\nindex b3a104e5783f..c1fbecc1c801 100644\n--- a/spring-orm/src/main/java/org/springframework/orm/jpa/vendor/SpringHibernateJpaPersistenceProvider.java\n+++ b/spring-orm/src/main/java/org/springframework/orm/jpa/vendor/SpringHibernateJpaPersistenceProvider.java\n@@ -22,6 +22,7 @@\n \n import jakarta.persistence.EntityManagerFactory;\n import jakarta.persistence.spi.PersistenceUnitInfo;\n+import org.hibernate.bytecode.enhance.spi.EnhancementContext;\n import org.hibernate.cfg.Configuration;\n import org.hibernate.cfg.Environment;\n import org.hibernate.jpa.HibernatePersistenceProvider;\n@@ -63,6 +64,13 @@ public EntityManagerFactory createContainerEntityManagerFactory(PersistenceUnitI\n \t\t\t\t\tpublic List\u003cString> getManagedClassNames() {\n \t\t\t\t\t\treturn mergedClassesAndPackages;\n \t\t\t\t\t}\n+\n+\t\t\t\t\t@Override\n+\t\t\t\t\tpublic void pushClassTransformer(EnhancementContext enhancementContext) {\n+\t\t\t\t\t\tif (!NativeDetector.inNativeImage()) {\n+\t\t\t\t\t\t\tsuper.pushClassTransformer(enhancementContext);\n+\t\t\t\t\t\t}\n+\t\t\t\t\t}\n \t\t\t\t}, properties).build();\n \t}",
      "candidates": [
        {
          "method": "Sanker",
          "text": "Here is a short commit message that summarizes the changes:\n\n\"Add support for skipping Hibernate class transformers in native images\"\n\nThis commit message accurately reflects the changes made in the diff, which introduces a check for native images and skips pushing a class transformer if the application is running in a native image environment.",
          "label": "A"
        },
        {
          "method": "NNGen",
          "text": "Set hibernate.bytecode.provider to none on native image",
          "label": "B"
        },
        {
          "method": "COME",
          "text": "Revert \"Fix NPE in SpringHibernateJpaPersistenceProvider\"",
          "label": "C"
        },
        {
          "method": "SRCMG",
          "text": "Fix hibernate enhancement for native images",
          "label": "D"
        },
        {
          "method": "ERICommiter",
          "text": "Add conditional override for pushClassTransformer in native image environment\n\n- Added an import for `EnhancementContext` in `SpringHibernateJpaPersistenceProvider.java`.\n- Introduced an override for the `pushClassTransformer` method to avoid pushing the class transformer",
          "label": "E"
        }
      ],
      "question_id": 9
    },
    {
      "language": "python",
      "commit_id": "3e3a4be6b584288bb77b620422c3f63dcb7da5d2",
      "gold_msg": "Update setup.py ()",
      "code_change": "diff --git a/setup.py b/setup.py\nindex d7544ca3a3d9..0f5a3cab44bf 100644\n--- a/setup.py\n+++ b/setup.py\n@@ -155,7 +155,7 @@ def get_git_sha() -> str:\n         \"trino\": [\"sqlalchemy-trino>=0.2\"],\n         \"prophet\": [\"prophet>=1.0.1, \u003c1.1\", \"pystan\u003c3.0\"],\n         \"redshift\": [\"sqlalchemy-redshift>=0.8.1, \u003c 0.9\"],\n-        \"rockset\": [\"rockset>=0.7.68, \u003c0.8\"],\n+        \"rockset\": [\"rockset>=0.8.10, \u003c0.9\"],\n         \"shillelagh\": [\n             \"shillelagh[datasetteapi,gsheetsapi,socrata,weatherapi]>=1.0.3, \u003c2\"\n         ],",
      "candidates": [
        {
          "method": "SRCMG",
          "text": "bump rockset to 0.8.x ()",
          "label": "A"
        },
        {
          "method": "COME",
          "text": "Update setup.py ()",
          "label": "B"
        },
        {
          "method": "Sanker",
          "text": "\"Bump Rockset dependency to version 0.8.10\"",
          "label": "C"
        },
        {
          "method": "NNGen",
          "text": "fix: small bump to shillelagh ()",
          "label": "D"
        },
        {
          "method": "ERICommiter",
          "text": "Bump Rockset dependency version to >=0.8.10 \u003c0.9 in setup.py",
          "label": "E"
        }
      ],
      "question_id": 10
    },
    {
      "language": "java",
      "commit_id": "5aa660ce1d5e4663494f0fddc15544369a22c93e",
      "gold_msg": "Fix duplicate ssl init ()",
      "code_change": "diff --git a/dubbo-remoting/dubbo-remoting-api/src/main/java/org/apache/dubbo/remoting/api/PortUnificationServer.java b/dubbo-remoting/dubbo-remoting-api/src/main/java/org/apache/dubbo/remoting/api/PortUnificationServer.java\nindex b28f4287266..51125bda346 100644\n--- a/dubbo-remoting/dubbo-remoting-api/src/main/java/org/apache/dubbo/remoting/api/PortUnificationServer.java\n+++ b/dubbo-remoting/dubbo-remoting-api/src/main/java/org/apache/dubbo/remoting/api/PortUnificationServer.java\n@@ -35,6 +35,7 @@\n import io.netty.channel.EventLoopGroup;\n import io.netty.channel.group.DefaultChannelGroup;\n import io.netty.channel.socket.SocketChannel;\n+import io.netty.handler.ssl.SslContext;\n import io.netty.util.concurrent.Future;\n import io.netty.util.concurrent.GlobalEventExecutor;\n \n@@ -111,6 +112,13 @@ protected void doOpen() {\n             getUrl().getPositiveParameter(IO_THREADS_KEY, Constants.DEFAULT_IO_THREADS),\n             EVENT_LOOP_WORKER_POOL_NAME);\n \n+        final boolean enableSsl = getUrl().getParameter(SSL_ENABLED_KEY, false);\n+        final SslContext sslContext;\n+        if (enableSsl) {\n+            sslContext = SslContexts.buildServerSslContext(url);\n+        } else {\n+            sslContext = null;\n+        }\n         bootstrap.group(bossGroup, workerGroup)\n             .channel(NettyEventLoopFactory.serverSocketChannelClass())\n             .option(ChannelOption.SO_REUSEADDR, Boolean.TRUE)\n@@ -121,15 +129,9 @@ protected void doOpen() {\n                 protected void initChannel(SocketChannel ch) throws Exception {\n                     // Do not add idle state handler here, because it should be added in the protocol handler.\n                     final ChannelPipeline p = ch.pipeline();\n-                    final boolean enableSsl = getUrl().getParameter(SSL_ENABLED_KEY, false);\n                     final PortUnificationServerHandler puHandler;\n-                    if (enableSsl) {\n-                        puHandler = new PortUnificationServerHandler(url,\n-                            SslContexts.buildServerSslContext(url), true, protocols, channels);\n-                    } else {\n-                        puHandler = new PortUnificationServerHandler(url, null, false, protocols,\n-                            channels);\n-                    }\n+                    puHandler = new PortUnificationServerHandler(url, sslContext, true, protocols,\n+                        channels);\n                     p.addLast(\"negotiation-protocol\", puHandler);\n                 }\n             });",
      "candidates": [
        {
          "method": "ERICommiter",
          "text": "Add SSL context handling in PortUnificationServer\n\n- Introduced SSL context creation at the server level within the `doOpen()` method of `PortUnificationServer`.\n- Conditionally initialize the `SslContext` based on the `SSL_ENABLED_KEY",
          "label": "A"
        },
        {
          "method": "SRCMG",
          "text": "refactor ssl context construction in port unification server ()",
          "label": "B"
        },
        {
          "method": "COME",
          "text": "Fix ssl context leak in PortUnificationServer ()",
          "label": "C"
        },
        {
          "method": "NNGen",
          "text": "Remove idle handler ()",
          "label": "D"
        },
        {
          "method": "Sanker",
          "text": "Here is a short commit message that describes the changes:\n\n\"Optimize SSL context creation in PortUnificationServer\"\n\nOr, following GitHub guidelines:\n\n\"Refactor PortUnificationServer to reuse SSL context\"\n\nThis commit message concisely summarizes the changes made to the `PortUnificationServer` class, which involve optimizing the creation and reuse of the SSL context.",
          "label": "E"
        }
      ],
      "question_id": 11
    },
    {
      "language": "java",
      "commit_id": "ca5f9c6249f085a3112a4784afa905f0bee8aa71",
      "gold_msg": "Add buildkite pipeline for updating serverless commit",
      "code_change": "diff --git a/.buildkite/promote-es-serverless.yml b/.buildkite/promote-es-serverless.yml\nnew file mode 100644\nindex 0000000000000..6c6807556ec38\n--- /dev/null\n+++ b/.buildkite/promote-es-serverless.yml\n@@ -0,0 +1,8 @@\n+steps:\n+  - trigger: elasticsearch-serverless\n+    label: \":elasticsearch: Run serverless tests\"\n+    build:\n+      message: \"Elasticsearch submodule promotion build\"\n+      env:\n+        ELASTICSEARCH_SUBMODULE_COMMIT: \"${BUILDKITE_COMMIT}\"\n+",
      "candidates": [
        {
          "method": "COME",
          "text": "Add serverless promotion build ()",
          "label": "A"
        },
        {
          "method": "SRCMG",
          "text": "Add serverless build promotion pipeline",
          "label": "B"
        },
        {
          "method": "NNGen",
          "text": "Update serverless submodule update build trigger",
          "label": "C"
        },
        {
          "method": "Sanker",
          "text": "Add Buildkite configuration for Elasticsearch serverless tests",
          "label": "D"
        },
        {
          "method": "ERICommiter",
          "text": "Add new Buildkite pipeline for Elasticsearch serverless promotion\n\n- Created a new `.buildkite/promote-es-serverless.yml` file to define the steps for promoting Elasticsearch serverless builds.\n- Set up a trigger for `elasticsearch-serverless` with",
          "label": "E"
        }
      ],
      "question_id": 12
    },
    {
      "language": "python",
      "commit_id": "3be689baf47259126a0516ccf6a5e03d353efac4",
      "gold_msg": "Improve utility_meter services.yaml ()",
      "code_change": "diff --git a/homeassistant/components/utility_meter/services.yaml b/homeassistant/components/utility_meter/services.yaml\nindex 800e001f6fff39..777af78257c8bb 100644\n--- a/homeassistant/components/utility_meter/services.yaml\n+++ b/homeassistant/components/utility_meter/services.yaml\n@@ -6,6 +6,7 @@ reset:\n   target:\n     entity:\n       domain: select\n+      integration: utility_meter\n \n next_tariff:\n   name: Next Tariff",
      "candidates": [
        {
          "method": "NNGen",
          "text": "Improve utility_meter services.yaml ()",
          "label": "A"
        },
        {
          "method": "SRCMG",
          "text": "Improve utility_meter services.yaml ()",
          "label": "B"
        },
        {
          "method": "ERICommiter",
          "text": "Add 'integration: utility_meter' to services.yaml for better service definition in Home Assistant components.",
          "label": "C"
        },
        {
          "method": "Sanker",
          "text": "Add integration to target entity in utility_meter services.yaml",
          "label": "D"
        },
        {
          "method": "COME",
          "text": "Add integration to utility_meter services.yaml ()",
          "label": "E"
        }
      ],
      "question_id": 13
    },
    {
      "language": "python",
      "commit_id": "8427de2776717b30086c277e5e8e140316dbd193",
      "gold_msg": "[RLlib] Fix ARS release test ()",
      "code_change": "diff --git a/rllib/tuned_examples/ars/cartpole-ars.yaml b/rllib/tuned_examples/ars/cartpole-ars.yaml\nindex ca9b4e493ace..6c698e45849f 100644\n--- a/rllib/tuned_examples/ars/cartpole-ars.yaml\n+++ b/rllib/tuned_examples/ars/cartpole-ars.yaml\n@@ -2,8 +2,8 @@ cartpole-ars:\n     env: CartPole-v1\n     run: ARS\n     stop:\n-        sampler_results/episode_reward_mean: 1\n-        timesteps_total: 1\n+        sampler_results/episode_reward_mean: 150\n+        timesteps_total: 1000000\n     config:\n         # Works for both torch and tf.\n         framework: torch",
      "candidates": [
        {
          "method": "NNGen",
          "text": "Updated empty_script.py",
          "label": "A"
        },
        {
          "method": "ERICommiter",
          "text": "Update ARS CartPole tuning parameters for improved performance\n\n- Increased `sampler_results/episode_reward_mean` from 1 to 150.\n- Increased `timesteps_total` from 1 to 1,000,000.\n- These changes",
          "label": "B"
        },
        {
          "method": "SRCMG",
          "text": "[RLlib] Increase stopping thresholds for CartPole ARS test",
          "label": "C"
        },
        {
          "method": "Sanker",
          "text": "\"Update CartPole-ARS example to increase stop criteria to episode reward mean of 150 and 1M timesteps\"",
          "label": "D"
        },
        {
          "method": "COME",
          "text": "[RLlib] Fix Cartpole ARS tuning. ()",
          "label": "E"
        }
      ],
      "question_id": 14
    },
    {
      "language": "python",
      "commit_id": "1dd01071ee5c530e5b4905d8739de905b1618342",
      "gold_msg": "Fix a typo ()",
      "code_change": "diff --git a/cheatsheets/XML_Security_Cheat_Sheet.md b/cheatsheets/XML_Security_Cheat_Sheet.md\nindex 4000910e42..f0d11098b0 100644\n--- a/cheatsheets/XML_Security_Cheat_Sheet.md\n+++ b/cheatsheets/XML_Security_Cheat_Sheet.md\n@@ -146,9 +146,9 @@ Defining the correct data type for numbers can be more complex since there are m\n XML Schema numeric data types can include different ranges of numbers. They could include:\n \n - **negativeInteger**: Only negative numbers\n-- **nonNegativeInteger**: Negative numbers and the zero value\n+- **nonNegativeInteger**: Positive numbers and the zero value\n - **positiveInteger**: Only positive numbers\n-- **nonPositiveInteger**: Positive numbers and the zero value\n+- **nonPositiveInteger**: Negative numbers and the zero value\n \n The following sample document defines an `id` for a product, a `price`, and a `quantity` value that is under the control of an attacker:",
      "candidates": [
        {
          "method": "COME",
          "text": "Update XML_Security_Cheat_Sheet.md",
          "label": "A"
        },
        {
          "method": "NNGen",
          "text": "pickle docs: Fix typos and improve wording (GH-24776)",
          "label": "B"
        },
        {
          "method": "Sanker",
          "text": "\"Update XML Security Cheat Sheet to correct definitions of nonNegativeInteger and nonPositiveInteger\"",
          "label": "C"
        },
        {
          "method": "SRCMG",
          "text": "Fix incorrect numeric type descriptions in XML security cheat sheet ()",
          "label": "D"
        },
        {
          "method": "ERICommiter",
          "text": "Fix XML numeric data type descriptions in cheat sheet\n\nClarified the descriptions of XML Schema numeric data types in the XML Security Cheat Sheet to accurately reflect their intended usage. Specifically, corrected the definitions for `nonNegativeInteger` and `nonPositiveInteger`",
          "label": "E"
        }
      ],
      "question_id": 15
    },
    {
      "language": "python",
      "commit_id": "30587136e9e6563572eb87fdb9979aaf1310c15d",
      "gold_msg": "CLN/TST: test_series_align_multiindex_containing_nan ()",
      "code_change": "diff --git a/pandas/tests/indexing/multiindex/test_multiindex.py b/pandas/tests/indexing/multiindex/test_multiindex.py\nindex f5f58e7e818d9..8e507212976ec 100644\n--- a/pandas/tests/indexing/multiindex/test_multiindex.py\n+++ b/pandas/tests/indexing/multiindex/test_multiindex.py\n@@ -151,57 +151,35 @@ def test_rename_multiindex_with_duplicates(self):\n         expected = DataFrame(index=mi2)\n         tm.assert_frame_equal(df, expected)\n \n-    @pytest.mark.parametrize(\n-        \"data_result, data_expected\",\n-        [\n-            (\n-                [\n-                    [(81.0, np.nan), (np.nan, np.nan)],\n-                    [(np.nan, np.nan), (82.0, np.nan)],\n-                    [1, 2],\n-                    [1, 2],\n-                ],\n-                [\n-                    [[81, 82.0, np.nan], Series([np.nan, np.nan, np.nan])],\n-                    [[81, 82.0, np.nan], Series([np.nan, np.nan, np.nan])],\n-                    [1, np.nan, 2],\n-                    [np.nan, 2, 1],\n-                ],\n-            ),\n-            (\n-                [\n-                    [(81.0, np.nan), (np.nan, np.nan)],\n-                    [(np.nan, np.nan), (81.0, np.nan)],\n-                    [1, 2],\n-                    [1, 2],\n-                ],\n-                [\n-                    [[81.0, np.nan], Series([np.nan, np.nan])],\n-                    [[81.0, np.nan], Series([np.nan, np.nan])],\n-                    [1, 2],\n-                    [2, 1],\n-                ],\n-            ),\n-        ],\n-    )\n-    def test_subtracting_two_series_with_unordered_index_and_all_nan_index(\n-        self, data_result, data_expected\n-    ):\n+    def test_series_align_multiindex_with_nan_overlap_only(self):\n+        # GH 38439\n+        mi1 = MultiIndex.from_arrays([[81.0, np.nan], [np.nan, np.nan]])\n+        mi2 = MultiIndex.from_arrays([[np.nan, 82.0], [np.nan, np.nan]])\n+        ser1 = Series([1, 2], index=mi1)\n+        ser2 = Series([1, 2], index=mi2)\n+        result1, result2 = ser1.align(ser2)\n+\n+        mi = MultiIndex.from_arrays([[81.0, 82.0, np.nan], [np.nan, np.nan, np.nan]])\n+        expected1 = Series([1.0, np.nan, 2.0], index=mi)\n+        expected2 = Series([np.nan, 2.0, 1.0], index=mi)\n+\n+        tm.assert_series_equal(result1, expected1)\n+        tm.assert_series_equal(result2, expected2)\n+\n+    def test_series_align_multiindex_with_nan(self):\n         # GH 38439\n-        # TODO: Refactor. This is impossible to understand GH#49443\n-        a_index_result = MultiIndex.from_tuples(data_result[0])\n-        b_index_result = MultiIndex.from_tuples(data_result[1])\n-        a_series_result = Series(data_result[2], index=a_index_result)\n-        b_series_result = Series(data_result[3], index=b_index_result)\n-        result = a_series_result.align(b_series_result)\n-\n-        a_index_expected = MultiIndex.from_arrays(data_expected[0])\n-        b_index_expected = MultiIndex.from_arrays(data_expected[1])\n-        a_series_expected = Series(data_expected[2], index=a_index_expected)\n-        b_series_expected = Series(data_expected[3], index=b_index_expected)\n-\n-        tm.assert_series_equal(result[0], a_series_expected)\n-        tm.assert_series_equal(result[1], b_series_expected)\n+        mi1 = MultiIndex.from_arrays([[81.0, np.nan], [np.nan, np.nan]])\n+        mi2 = MultiIndex.from_arrays([[np.nan, 81.0], [np.nan, np.nan]])\n+        ser1 = Series([1, 2], index=mi1)\n+        ser2 = Series([1, 2], index=mi2)\n+        result1, result2 = ser1.align(ser2)\n+\n+        mi = MultiIndex.from_arrays([[81.0, np.nan], [np.nan, np.nan]])\n+        expected1 = Series([1, 2], index=mi)\n+        expected2 = Series([2, 1], index=mi)\n+\n+        tm.assert_series_equal(result1, expected1)\n+        tm.assert_series_equal(result2, expected2)\n \n     def test_nunique_smoke(self):\n         # GH 34019",
      "candidates": [
        {
          "method": "ERICommiter",
          "text": "TST/REF: Simplify and refactor test for Series alignment with MultiIndex and NaN overlap (GH 38439)\n\n- Refactored the test for aligning two Series with MultiIndex that includes NaN overlaps. \n- Simplified",
          "label": "A"
        },
        {
          "method": "COME",
          "text": "TST: Fix test_rename_multiindex_with_duplicates ()",
          "label": "B"
        },
        {
          "method": "NNGen",
          "text": "Testcase Subtracting two series with unordered index and all-nan index produces unexpected result ()",
          "label": "C"
        },
        {
          "method": "SRCMG",
          "text": "TST: series align with MultiIndex containing NaN overlap only ()",
          "label": "D"
        },
        {
          "method": "Sanker",
          "text": "Refactor tests for aligning Series with MultiIndex and NaN values\n\nThis commit refactors and simplifies test cases for aligning Series with MultiIndex and NaN values, making the code more readable and easier to understand. The changes are related to GitHub issue #38439.",
          "label": "E"
        }
      ],
      "question_id": 16
    },
    {
      "language": "python",
      "commit_id": "9ea8e0a7caab15253e0941154636843e46ee7523",
      "gold_msg": "Use _attr_state in harman kardon avr media player ()",
      "code_change": "diff --git a/homeassistant/components/harman_kardon_avr/media_player.py b/homeassistant/components/harman_kardon_avr/media_player.py\nindex f222d4bd739553..17b3d0c57173e8 100644\n--- a/homeassistant/components/harman_kardon_avr/media_player.py\n+++ b/homeassistant/components/harman_kardon_avr/media_player.py\n@@ -66,18 +66,17 @@ def __init__(self, avr):\n \n         self._source_list = avr.sources\n \n-        self._state = None\n         self._muted = avr.muted\n         self._current_source = avr.current_source\n \n     def update(self) -> None:\n         \"\"\"Update the state of this media_player.\"\"\"\n         if self._avr.is_on():\n-            self._state = MediaPlayerState.ON\n+            self._attr_state = MediaPlayerState.ON\n         elif self._avr.is_off():\n-            self._state = MediaPlayerState.OFF\n+            self._attr_state = MediaPlayerState.OFF\n         else:\n-            self._state = None\n+            self._attr_state = None\n \n         self._muted = self._avr.muted\n         self._current_source = self._avr.current_source\n@@ -87,11 +86,6 @@ def name(self):\n         \"\"\"Return the name of the device.\"\"\"\n         return self._name\n \n-    @property\n-    def state(self):\n-        \"\"\"Return the state of the device.\"\"\"\n-        return self._state\n-\n     @property\n     def is_volume_muted(self):\n         \"\"\"Muted status not available.\"\"\"",
      "candidates": [
        {
          "method": "COME",
          "text": "Use _attr_state in harman_kardon_avr media player ()",
          "label": "A"
        },
        {
          "method": "ERICommiter",
          "text": "Refactor media player components to utilize entity attributes\n\nThis commit refactors several media player components in the Home Assistant codebase to use attributes directly prefixed with `_attr_` instead of private variables for state management and other entity properties. This change aligns",
          "label": "B"
        },
        {
          "method": "SRCMG",
          "text": "Use _attr_state in harman_kardon_avr media player ()",
          "label": "C"
        },
        {
          "method": "NNGen",
          "text": "Use _attr in pjlink media player ()",
          "label": "D"
        },
        {
          "method": "Sanker",
          "text": "\"Replace internal `_state` attribute with `state` attribute in Harman Kardon AVR media player\"",
          "label": "E"
        }
      ],
      "question_id": 17
    },
    {
      "language": "java",
      "commit_id": "d6e5c29e2561c2c38f112f8939f7a4c815bed935",
      "gold_msg": "Recommend `ssha256` cache hasher in FIPS docs ()",
      "code_change": "diff --git a/x-pack/docs/en/security/fips-140-compliance.asciidoc b/x-pack/docs/en/security/fips-140-compliance.asciidoc\nindex 13583400545c5..c34e9e8e92cfd 100644\n--- a/x-pack/docs/en/security/fips-140-compliance.asciidoc\n+++ b/x-pack/docs/en/security/fips-140-compliance.asciidoc\n@@ -113,11 +113,12 @@ keys must have corresponding length according to the following table:\n |=======================\n \n [discrete]\n-==== Password Hashing\n+==== Stored password hashing\n+[[fips-stored-password-hashing]]\n \n-While {es} offers a number of algorithms for securely hashing credentials in memory and\n+While {es} offers a number of algorithms for securely hashing credentials\n on disk, only the `PBKDF2` based family of algorithms is compliant with FIPS\n-140-2 for password hashing. However, since `PBKDF2` is essentially a key derivation\n+140-2 for stored password hashing. However, since `PBKDF2` is essentially a key derivation\n function, your JVM security provider may enforce a\n \u003c\u003ckeystore-fips-password,112-bit key strength requirement>>. Although FIPS 140-2\n does not mandate user password standards, this requirement may affect password\n@@ -131,8 +132,7 @@ NOTE: You can still use one of the plain `pbkdf2` options instead of `pbkdf2_str\n you have external policies and tools that can ensure all user passwords for the reserved,\n native, and file realms are longer than 14 bytes.\n \n-You must set the `cache.hash_algo` realm settings\n-and the `xpack.security.authc.password_hashing.algorithm` setting to one of the\n+You must set the `xpack.security.authc.password_hashing.algorithm` setting to one of the\n available `pbkdf_stretch_*` values.\n When FIPS-140 mode is enabled, the default value for\n `xpack.security.authc.password_hashing.algorithm` is `pbkdf2_stretch`.\n@@ -147,9 +147,27 @@ for the file realm and the \u003c\u003csecurity-api-put-user,create users>> and\n \u003c\u003csecurity-api-change-password,change password>> APIs for the native and reserved realms.\n Other types of realms are not affected and do not require any changes.\n \n-The user cache will be emptied upon node restart, so any existing hashes using\n-non-compliant algorithms will be discarded and the new ones will be created\n-using the compliant `PBKDF2` based algorithm you have selected.\n+[discrete]\n+==== Cached password hashing\n+[[fips-cached-password-hashing]]\n+\n+`ssha256` (salted `sha256`) is recommended for cache hashing. Though\n+`PBKDF2` is compliant with FIPS-140-2, it is -- by design -- slow, and\n+thus not generally suitable as a cache hashing algorithm. Cached\n+credentials are never stored on disk, and salted `sha256` provides an\n+adequate level of security for in-memory credential hashing, without\n+imposing prohibitive performance overhead. You _may_ use `PBKDF2`,\n+however you should carefully assess performance impact first. Depending\n+on your deployment, the overhead of `PBKDF2` could undo most of the\n+performance gain of using a cache.\n+\n+Either set all `cache.hash_algo` settings to `ssha256` or leave\n+them undefined, since `ssha256` is the default value for all\n+`cache.hash_algo` settings. See \u003c\u003chashing-settings>>.\n+\n+The user cache will be emptied upon node restart, so any existing\n+hashes using non-compliant algorithms will be discarded and the new\n+ones will be created using the algorithm you have selected.\n \n [discrete]\n === Limitations",
      "candidates": [
        {
          "method": "ERICommiter",
          "text": "### Commit Message\n\n**Title:** Clarify Role Mapping Support and Alternatives; Enhance JWT and Savepoint Documentation\n\n**Body:**\n- **Role Mapping Documentation:**\n  - Clarified the role mapping support across different realms, indicating which realms support the",
          "label": "A"
        },
        {
          "method": "COME",
          "text": "[DOCS] Add section on stored password hashing ()",
          "label": "B"
        },
        {
          "method": "NNGen",
          "text": "Release 7.0.0-pre.20230517.4 (2023-05-26)",
          "label": "C"
        },
        {
          "method": "SRCMG",
          "text": "Clarify password hashing requirements for FIPS compliance ()",
          "label": "D"
        },
        {
          "method": "Sanker",
          "text": "Update FIPS 140 compliance documentation for password hashing in X-Pack security.",
          "label": "E"
        }
      ],
      "question_id": 18
    },
    {
      "language": "python",
      "commit_id": "5f3e73c5a381eeff3ea76a4e837f2c058e37197c",
      "gold_msg": "chore(deps): bump cross-fetch from 3.1.4 to 3.1.5 in /docs ()",
      "code_change": "diff --git a/docs/yarn.lock b/docs/yarn.lock\nindex 30d50fd990ef..b87498c11780 100644\n--- a/docs/yarn.lock\n+++ b/docs/yarn.lock\n@@ -5003,11 +5003,11 @@ cosmiconfig@^7.0.0, cosmiconfig@^7.0.1:\n     yaml \"^1.10.0\"\n \n cross-fetch@^3.0.4, cross-fetch@^3.1.4:\n-  version \"3.1.4\"\n-  resolved \"https://registry.npmjs.org/cross-fetch/-/cross-fetch-3.1.4.tgz\"\n-  integrity sha512-1eAtFWdIubi6T4XPy6ei9iUFoKpUkIF971QLN8lIvvvwueI65+Nw5haMNKUwfJxabqlIIDODJKGrQ66gxC0PbQ==\n+  version \"3.1.5\"\n+  resolved \"https://registry.yarnpkg.com/cross-fetch/-/cross-fetch-3.1.5.tgz#e1389f44d9e7ba767907f7af8454787952ab534f\"\n+  integrity sha512-lvb1SBsI0Z7GDwmuid+mU3kWVBwTVUbe7S0H52yaaAdQOXq2YktTCZdlAcNKFzE6QtRz0snpw9bNiPeOIkkQvw==\n   dependencies:\n-    node-fetch \"2.6.1\"\n+    node-fetch \"2.6.7\"\n \n cross-spawn@^7.0.3:\n   version \"7.0.3\"\n@@ -7876,10 +7876,12 @@ node-emoji@^1.10.0:\n   dependencies:\n     lodash \"^4.17.21\"\n \n-node-fetch@2.6.1:\n-  version \"2.6.1\"\n-  resolved \"https://registry.npmjs.org/node-fetch/-/node-fetch-2.6.1.tgz\"\n-  integrity sha512-V4aYg89jEoVRxRb2fJdAg8FHvI7cEyYdVAh94HH0UIK8oJxUfkjlDQN9RbMx+bEjP7+ggMiFRprSti032Oipxw==\n+node-fetch@2.6.7:\n+  version \"2.6.7\"\n+  resolved \"https://registry.yarnpkg.com/node-fetch/-/node-fetch-2.6.7.tgz#24de9fba827e3b4ae44dc8b20256a379160052ad\"\n+  integrity sha512-ZjMPFEfVx5j+y2yF35Kzx5sF7kDzxuDj6ziH4FFbOp87zKDZNx8yExJIb05OGF4Nlt9IHFIMBkRl41VdvcNdbQ==\n+  dependencies:\n+    whatwg-url \"^5.0.0\"\n \n node-forge@^1.2.0:\n   version \"1.3.1\"\n@@ -10721,6 +10723,11 @@ totalist@^1.0.0:\n   resolved \"https://registry.npmjs.org/totalist/-/totalist-1.1.0.tgz\"\n   integrity sha512-gduQwd1rOdDMGxFG1gEvhV88Oirdo2p+KjoYFU7k2g+i7n6AFFbDQ5kMPUsW0pNbfQsB/cwXvT1i4Bue0s9g5g==\n \n+tr46@~0.0.3:\n+  version \"0.0.3\"\n+  resolved \"https://registry.yarnpkg.com/tr46/-/tr46-0.0.3.tgz#8184fd347dac9cdc185992f3a6622e14b9d9ab6a\"\n+  integrity sha1-gYT9NH2snNwYWZLzpmIuFLnZq2o=\n+\n traverse@~0.6.6:\n   version \"0.6.6\"\n   resolved \"https://registry.npmjs.org/traverse/-/traverse-0.6.6.tgz\"\n@@ -11145,6 +11152,11 @@ web-streams-polyfill@4.0.0-beta.1:\n   resolved \"https://registry.npmjs.org/web-streams-polyfill/-/web-streams-polyfill-4.0.0-beta.1.tgz\"\n   integrity sha512-3ux37gEX670UUphBF9AMCq8XM6iQ8Ac6A+DSRRjDoRBm1ufCkaCDdNVbaqq60PsEkdNlLKrGtv/YBP4EJXqNtQ==\n \n+webidl-conversions@^3.0.0:\n+  version \"3.0.1\"\n+  resolved \"https://registry.yarnpkg.com/webidl-conversions/-/webidl-conversions-3.0.1.tgz#24534275e2a7bc6be7bc86611cc16ae0a5654871\"\n+  integrity sha1-JFNCdeKnvGvnvIZhHMFq4KVlSHE=\n+\n webpack-bundle-analyzer@^4.5.0:\n   version \"4.5.0\"\n   resolved \"https://registry.yarnpkg.com/webpack-bundle-analyzer/-/webpack-bundle-analyzer-4.5.0.tgz#1b0eea2947e73528754a6f9af3e91b2b6e0f79d5\"\n@@ -11347,6 +11359,14 @@ websocket-extensions@>=0.1.1:\n   resolved \"https://registry.npmjs.org/websocket-extensions/-/websocket-extensions-0.1.4.tgz\"\n   integrity sha512-OqedPIGOfsDlo31UNwYbCFMSaO9m9G/0faIHj5/dZFDMFqPTcx6UwqyOy3COEaEOg/9VsGIpdqn62W5KhoKSpg==\n \n+whatwg-url@^5.0.0:\n+  version \"5.0.0\"\n+  resolved \"https://registry.yarnpkg.com/whatwg-url/-/whatwg-url-5.0.0.tgz#966454e8765462e37644d3626f6742ce8b70965d\"\n+  integrity sha1-lmRU6HZUYuN2RNNib2dCzotwll0=\n+  dependencies:\n+    tr46 \"~0.0.3\"\n+    webidl-conversions \"^3.0.0\"\n+\n which-boxed-primitive@^1.0.2:\n   version \"1.0.2\"\n   resolved \"https://registry.npmjs.org/which-boxed-primitive/-/which-boxed-primitive-1.0.2.tgz\"",
      "candidates": [
        {
          "method": "SRCMG",
          "text": "build(deps): bump cross-fetch and node-fetch in /docs ()",
          "label": "A"
        },
        {
          "method": "ERICommiter",
          "text": "chore(deps): bump cross-fetch from 3.1.4 to 3.1.5 in /docs\n\n- Updated `cross-fetch` from version 3.1.4 to 3.1.5 in the `",
          "label": "B"
        },
        {
          "method": "COME",
          "text": "build(deps): bump cross-fetch from 3.1.4 to 3.1.5 in /docs",
          "label": "C"
        },
        {
          "method": "NNGen",
          "text": "build(deps): bump express from 4.17.1 to 4.18.2 in /docs ()",
          "label": "D"
        },
        {
          "method": "Sanker",
          "text": "Here is a short commit message that summarizes the changes:\n\n`Update dependencies: cross-fetch, node-fetch, and add whatwg-url`\n\nThis commit message captures the main changes in the diff, which include updating the versions of `cross-fetch` and `node-fetch`, and adding new dependencies `whatwg-url`, `tr46`, and `webidl-conversions`.",
          "label": "E"
        }
      ],
      "question_id": 19
    },
    {
      "language": "java",
      "commit_id": "13e143c2aeec7cc38fa54095189ed4bd762a2975",
      "gold_msg": "Export EPollEventLoop methods for closing/opening native file descriptors as UnstableAPI ()",
      "code_change": "diff --git a/transport-classes-epoll/src/main/java/io/netty/channel/epoll/EpollEventLoop.java b/transport-classes-epoll/src/main/java/io/netty/channel/epoll/EpollEventLoop.java\nindex ce611b6916f8..a4a631749631 100644\n--- a/transport-classes-epoll/src/main/java/io/netty/channel/epoll/EpollEventLoop.java\n+++ b/transport-classes-epoll/src/main/java/io/netty/channel/epoll/EpollEventLoop.java\n@@ -31,6 +31,7 @@\n import io.netty.util.internal.ObjectUtil;\n import io.netty.util.internal.PlatformDependent;\n import io.netty.util.internal.SystemPropertyUtil;\n+import io.netty.util.internal.UnstableApi;\n import io.netty.util.internal.logging.InternalLogger;\n import io.netty.util.internal.logging.InternalLoggerFactory;\n \n@@ -45,7 +46,7 @@\n /**\n  * {@link EventLoop} which uses epoll under the covers. Only works on Linux!\n  */\n-class EpollEventLoop extends SingleThreadEventLoop {\n+public class EpollEventLoop extends SingleThreadEventLoop {\n     private static final InternalLogger logger = InternalLoggerFactory.getInstance(EpollEventLoop.class);\n     private static final long EPOLL_WAIT_MILLIS_THRESHOLD =\n             SystemPropertyUtil.getLong(\"io.netty.channel.epoll.epollWaitThreshold\", 10);\n@@ -56,9 +57,9 @@ class EpollEventLoop extends SingleThreadEventLoop {\n         Epoll.ensureAvailability();\n     }\n \n-    private final FileDescriptor epollFd;\n-    private final FileDescriptor eventFd;\n-    private final FileDescriptor timerFd;\n+    private FileDescriptor epollFd;\n+    private FileDescriptor eventFd;\n+    private FileDescriptor timerFd;\n     private final IntObjectMap\u003cAbstractEpollChannel> channels = new IntObjectHashMap\u003cAbstractEpollChannel>(4096);\n     private final boolean allowGrowing;\n     private final EpollEventArray events;\n@@ -102,6 +103,15 @@ public int get() throws Exception {\n             allowGrowing = false;\n             events = new EpollEventArray(maxEvents);\n         }\n+        openFileDescriptors();\n+    }\n+\n+    /**\n+     * This method is intended for use by a process checkpoint/restore\n+     * integration, such as OpenJDK CRaC.\n+     */\n+    @UnstableApi\n+    public void openFileDescriptors() {\n         boolean success = false;\n         FileDescriptor epollFd = null;\n         FileDescriptor eventFd = null;\n@@ -524,40 +534,7 @@ private boolean processReady(EpollEventArray events, int ready) {\n     @Override\n     protected void cleanup() {\n         try {\n-            // Ensure any in-flight wakeup writes have been performed prior to closing eventFd.\n-            while (pendingWakeup) {\n-                try {\n-                    int count = epollWaitTimeboxed();\n-                    if (count == 0) {\n-                        // We timed-out so assume that the write we're expecting isn't coming\n-                        break;\n-                    }\n-                    for (int i = 0; i \u003c count; i++) {\n-                        if (events.fd(i) == eventFd.intValue()) {\n-                            pendingWakeup = false;\n-                            break;\n-                        }\n-                    }\n-                } catch (IOException ignore) {\n-                    // ignore\n-                }\n-            }\n-            try {\n-                eventFd.close();\n-            } catch (IOException e) {\n-                logger.warn(\"Failed to close the event fd.\", e);\n-            }\n-            try {\n-                timerFd.close();\n-            } catch (IOException e) {\n-                logger.warn(\"Failed to close the timer fd.\", e);\n-            }\n-\n-            try {\n-                epollFd.close();\n-            } catch (IOException e) {\n-                logger.warn(\"Failed to close the epoll fd.\", e);\n-            }\n+            closeFileDescriptors();\n         } finally {\n             // release native memory\n             if (iovArray != null) {\n@@ -571,4 +548,48 @@ protected void cleanup() {\n             events.free();\n         }\n     }\n+\n+    /**\n+     * This method is intended for use by process checkpoint/restore\n+     * integration, such as OpenJDK CRaC.\n+     * It's up to the caller to ensure that there is no concurrent use\n+     * of the FDs while these are closed, e.g. by blocking the executor.\n+     */\n+    @UnstableApi\n+    public void closeFileDescriptors() {\n+        // Ensure any in-flight wakeup writes have been performed prior to closing eventFd.\n+        while (pendingWakeup) {\n+            try {\n+                int count = epollWaitTimeboxed();\n+                if (count == 0) {\n+                    // We timed-out so assume that the write we're expecting isn't coming\n+                    break;\n+                }\n+                for (int i = 0; i \u003c count; i++) {\n+                    if (events.fd(i) == eventFd.intValue()) {\n+                        pendingWakeup = false;\n+                        break;\n+                    }\n+                }\n+            } catch (IOException ignore) {\n+                // ignore\n+            }\n+        }\n+        try {\n+            eventFd.close();\n+        } catch (IOException e) {\n+            logger.warn(\"Failed to close the event fd.\", e);\n+        }\n+        try {\n+            timerFd.close();\n+        } catch (IOException e) {\n+            logger.warn(\"Failed to close the timer fd.\", e);\n+        }\n+\n+        try {\n+            epollFd.close();\n+        } catch (IOException e) {\n+            logger.warn(\"Failed to close the epoll fd.\", e);\n+        }\n+    }\n }",
      "candidates": [
        {
          "method": "NNGen",
          "text": "[JENKINS-70334] Fix and simplify `TcpSlaveAgentListenerRescheduler` ()",
          "label": "A"
        },
        {
          "method": "ERICommiter",
          "text": "[EPOLL] Refactor EpollEventLoop to separate file descriptor management\n\n- Modified `EpollEventLoop` to be a public class.\n- Added `openFileDescriptors()` method, annotated with `@UnstableApi`, to facilitate integration",
          "label": "B"
        },
        {
          "method": "SRCMG",
          "text": "Make EpollEventLoop public for checkpoint/restore support",
          "label": "C"
        },
        {
          "method": "Sanker",
          "text": "\"Extract file descriptor opening and closing into separate methods for use with process checkpoint/restore integrations\"",
          "label": "D"
        },
        {
          "method": "COME",
          "text": "Make EpollEventLoop public to support multiple threads ()",
          "label": "E"
        }
      ],
      "question_id": 20
    },
    {
      "language": "java",
      "commit_id": "d40c5165f57fe036fb4e4e70ba94ae8b0780c72a",
      "gold_msg": "GP-0 updated Change History for 10.3.1 release",
      "code_change": "diff --git a/Ghidra/Configurations/Public_Release/src/global/docs/ChangeHistory.html b/Ghidra/Configurations/Public_Release/src/global/docs/ChangeHistory.html\nindex 493a2674765..9641b951b3e 100644\n--- a/Ghidra/Configurations/Public_Release/src/global/docs/ChangeHistory.html\n+++ b/Ghidra/Configurations/Public_Release/src/global/docs/ChangeHistory.html\n@@ -22,6 +22,55 @@\n \n \u003cBODY>\n \n+\u003cH1 align=\"center\">Ghidra 10.3.1 Change History (June 2023)\u003c/H1>\n+\u003cblockquote>\u003cp>\u003cu>\u003cB>Improvements\u003c/B>\u003c/u>\u003c/p>\n+\u003cul>\n+    \u003cli>\u003cI>Debugger:LLDB\u003c/I>. Upgraded SWIG-generated Java (plus docs) to LLVM/lldb 16.x. (GP-3442, Issue #5359)\u003c/li>\n+    \u003cli>\u003cI>Decompiler\u003c/I>. Added an option to the Decompiler, controlling the maximum size of jumptable that can be recovered. (GP-3266)\u003c/li>\n+    \u003cli>\u003cI>Decompiler\u003c/I>. Improved Decompiler function call-override to consider calling convention when differentiating function signatures. (GP-3268, Issue #5335)\u003c/li>\n+    \u003cli>\u003cI>Decompiler\u003c/I>. The Decompiler now respects tool options for shortening template strings within symbol names. (GP-3369)\u003c/li>\n+    \u003cli>\u003cI>Importer:ELF\u003c/I>. Added \u003cspan class=\"gtitle\">Max Zero-Segment Discard Size\u003c/span> import option to ELF Loader.  Value was previously hard-coded to 255 bytes. (GP-3428, Issue #5273)\u003c/li>\n+    \u003cli>\u003cI>Importer:Mach-O\u003c/I>. Restored Mach-O indirect symbol creation when binding information is not present, such as when importing a \u003cspan class=\"gcode\">DYLIB\u003c/span> extracted from a \u003cspan class=\"gcode\">dyld_shared_cache\u003c/span>. (GP-3526)\u003c/li>\n+    \u003cli>\u003cI>Languages\u003c/I>. Added windows\u003cspan class=\"gcode\">__stdcall\u003c/span> calling convention as an alias to the default calling convention for \u003cspan class=\"gcode\">aarch64\u003c/span> and \u003cspan class=\"gcode\">x86-64\u003c/span>. (GP-3472)\u003c/li>\n+    \u003cli>\u003cI>Scripting\u003c/I>. Improved the \u003cspan class=\"gcode\">RecoverClassesFromRTTIScript\u003c/span> recognition of special vtables when they are in memory blocks not tied to imported file bytes. (GP-3463)\u003c/li>\n+    \u003cli>\u003cI>Scripting\u003c/I>. Mitigated a \u003cspan class=\"gcode\">RecoverClassesFromRTTIScript\u003c/span> issue where mangled typeinfo names were not always getting extracted from memory when more than one bad data type was created over the memory containing the mangled string. (GP-3467)\u003c/li>\n+\u003c/ul>\n+\u003c/blockquote>\n+\u003cblockquote>\u003cp>\u003cu>\u003cB>Bugs\u003c/B>\u003c/u>\u003c/p>\n+\u003cul>\n+    \u003cli>\u003cI>Analysis\u003c/I>. Fixed regression when functions are set as inline that can cause lockups: during analysis, with use of stack depth field, and for \u003cspan class=\"gtitle\">Set Stack Depth Change\u003c/span> action. (GP-3499, Issue #5378, #5400, #5401)\u003c/li>\n+    \u003cli>\u003cI>CParser\u003c/I>. Fixed C header file parsing of \u003cspan class=\"gcode\">pragma\u003c/span> lines when a comma is found outside of parentheses. (GP-3541, Issue #5427)\u003c/li>\n+    \u003cli>\u003cI>Data Types\u003c/I>. Corrected issues related to data organization retention and upgrade for data types. (GP-3506)\u003c/li>\n+    \u003cli>\u003cI>Debugger:GDB\u003c/I>. Reduced frenetic queries for module info at launch time. Fixed \u003cspan class=\"gcode\">00000000\u003c/span> values in module ranges. (GP-3448, Issue #4456, #5357)\u003c/li>\n+    \u003cli>\u003cI>Decompiler\u003c/I>. Fixed bug that could cause errors in constant calculations involving 128-bit or larger registers. (GP-3426, Issue #3492)\u003c/li>\n+    \u003cli>\u003cI>Decompiler\u003c/I>. Fixed a bug that could prevent recovery of a switch if the variable is written indirectly through a pointer alias. (GP-3441, Issue #5307)\u003c/li>\n+    \u003cli>\u003cI>Decompiler\u003c/I>. Corrected 10.3 regression when \u003cspan class=\"gtitle\">Edit Function Signature\u003c/span> is invoked from Decompiler, which may ignore the calling convention used with current function decompilation. (GP-3454, Issue #5367)\u003c/li>\n+    \u003cli>\u003cI>Decompiler\u003c/I>. Fixed hashing bug causing inconsistent results with \u003cspan class=\"gtitle\">Force Field\u003c/span> action in the Decompiler. (GP-3508, Issue #5372)\u003c/li>\n+    \u003cli>\u003cI>Documentation\u003c/I>. Fixed missing \u003cspan class=\"gcode\">return\u003c/span> in \u003cspan class=\"gcode\">termmines.c\u003c/span> exercise file. (GP-3444, Issue #5343)\u003c/li>\n+    \u003cli>\u003cI>Exporter\u003c/I>. Fixed a regression in the \u003cspan class=\"gtitle\">Original File\u003c/span> exporter that prevented it from working when unapplied relocations were present in the relocation table. (GP-3446, Issue #5346)\u003c/li>\n+    \u003cli>\u003cI>GUI\u003c/I>. Fixed bug where Ghidra did not prompt to save GUI Theme changes when exiting via a menu versus the window \u003cspan class=\"gtitle\">X\u003c/span> (\u003cem>Close Window\u003c/em>) button. (GP-3477, Issue #5377)\u003c/li>\n+    \u003cli>\u003cI>GUI\u003c/I>. Updated the Python Interpreter prompt to use less space. (GP-3509, Issue #5379)\u003c/li>\n+    \u003cli>\u003cI>GUI\u003c/I>. Fixed issue with menu bar colors on Mac system when using \u003cspan class=\"gtitle\">Mac Aqua Look and Feel\u003c/span> while in dark mode. (GP-3528, Issue #4454)\u003c/li>\n+    \u003cli>\u003cI>Importer\u003c/I>. Fixed an exception that occurred when the \u003cspan class=\"gcode\">MzLoader\u003c/span> tried to split the \u003cspan class=\"gcode\">HEADER\u003c/span> overlay block. (GP-3447, Issue #5320)\u003c/li>\n+    \u003cli>\u003cI>Importer:ELF\u003c/I>. Corrected potential exception when processing invalid \u003cspan class=\"gcode\">ELF PT_NOTE\u003c/span> program header. (GP-3493, Issue #5384)\u003c/li>\n+    \u003cli>\u003cI>Importer:Mach-O\u003c/I>. Fixed a regression in the Mach-O Loader that was causing incorrect \u003cspan class=\"gcode\">DYLD_CHAINED_PTR_X86_64_KERNEL_CACHE\u003c/span> fixups. (GP-3474)\u003c/li>\n+    \u003cli>\u003cI>Importer:Mach-O\u003c/I>. Fixed an \u003cspan class=\"gcode\">AddressOutOfBoundsException\u003c/span> that could sometimes occur when importing the exports section of \u003cspan class=\"gcode\">dyld_shared_cache\u003c/span> files. (GP-3505, Issue #5392)\u003c/li>\n+    \u003cli>\u003cI>Importer:PE\u003c/I>. Fixed an \u003cspan class=\"gcode\">IllegalStateException\u003c/span> that could occur if both \u003cspan class=\"gtitle\">Load Local Libraries From Disk\u003c/span> and \u003cspan class=\"gtitle\">Load System Libraries From Disk\u003c/span> options are used during import and the same library is found in both local and system directories. (GP-3445)\u003c/li>\n+    \u003cli>\u003cI>Importer:PE\u003c/I>. Fixed a bug that caused PE symbol \u003cspan class=\"gcode\">.exports\u003c/span> files to always get deleted after import. (GP-3519, Issue #5348)\u003c/li>\n+    \u003cli>\u003cI>Languages\u003c/I>. Adjusted handling of PowerPC e500 small data area pointer. (GP-3480)\u003c/li>\n+    \u003cli>\u003cI>Processors\u003c/I>. Fixed operand count mismatch in some M68000 instructions. (GP-2779, Issue #4807, #4808)\u003c/li>\n+    \u003cli>\u003cI>Processors\u003c/I>. Corrected issue with M68000 \u003cspan class=\"gcode\">pea\u003c/span> instruction with address based on \u003cspan class=\"gcode\">SP\u003c/span>. (GP-2955, Issue #4795)\u003c/li>\n+    \u003cli>\u003cI>Processors\u003c/I>. Fixed flag issue in 6502 \u003cspan class=\"gcode\">TSX\u003c/span> instruction. (GP-2963, Issue #4838)\u003c/li>\n+    \u003cli>\u003cI>Processors\u003c/I>. Addressed multiple issues with 8048, including fixing the \u003cspan class=\"gcode\">movp\u003c/span>, \u003cspan class=\"gcode\">movp3\u003c/span>, and \u003cspan class=\"gcode\">jmpp\u003c/span> instructions and correcting the implementation of the memory bank selection. (GP-3009, Issue #2423, #4825)\u003c/li>\n+    \u003cli>\u003cI>Processors\u003c/I>. Fixed decoding of x86-64 \u003cspan class=\"gcode\">popf\u003c/span> and \u003cspan class=\"gcode\">pushf\u003c/span> instructions. (GP-3102, Issue #4980)\u003c/li>\n+    \u003cli>\u003cI>Processors\u003c/I>. Corrected pcode for PowerPC \u003cspan class=\"gcode\">e_stmvsprw\u003c/span> instruction. (GP-3325, Issue #4886)\u003c/li>\n+    \u003cli>\u003cI>Processors\u003c/I>. Fixed PowerPC instruction \u003cspan class=\"gcode\">eieio\u003c/span> decode for all valid variants. (GP-3432, Issue #4887)\u003c/li>\n+    \u003cli>\u003cI>Processors\u003c/I>. Fixed issue with AARCH64 \u003cspan class=\"gcode\">mla\u003c/span> instruction using erroneous registers. (GP-3478)\u003c/li>\n+    \u003cli>\u003cI>Processors\u003c/I>. Restored original M68000 calling convention to only use stack, and added an additional \u003cspan class=\"gcode\">.cspec\u003c/span> file for the optional \u003cem>Register ABI\u003c/em> calling convention for ColdFire.  Also added bonus function start patterns identified during testing. (GP-3532, Issue #5390)\u003c/li>\n+    \u003cli>\u003cI>Sleigh\u003c/I>. Fixed SleighEditor to allow \u003cspan class=\"gcode\">2\u003c/span> to \u003cspan class=\"gcode\">n\u003c/span> arguments in \u003cspan class=\"gcode\">CPOOL\u003c/span> Sleigh operator. (GP-3534, Issue #2148)\u003c/li>\n+\u003c/ul>\n+\u003c/blockquote>\n+\n \u003cH1 align=\"center\">Ghidra 10.3 Change History (May 2023)\u003c/H1>\n \u003cblockquote>\u003cp>\u003cu>\u003cB>New Features\u003c/B>\u003c/u>\u003c/p>\n \u003cul>",
      "candidates": [
        {
          "method": "SRCMG",
          "text": "GP-0 Updated ChangeHistory for 10.3.1 release",
          "label": "A"
        },
        {
          "method": "ERICommiter",
          "text": "Updated ChangeHistory for 10.3.1 release",
          "label": "B"
        },
        {
          "method": "COME",
          "text": "Updated ChangeHistory for 10.3.1 release",
          "label": "C"
        },
        {
          "method": "Sanker",
          "text": "Ghidra 10.3.1 release with various improvements and bug fixes.",
          "label": "D"
        },
        {
          "method": "NNGen",
          "text": "Updated ChangeHistory for 10.1.2",
          "label": "E"
        }
      ],
      "question_id": 21
    },
    {
      "language": "java",
      "commit_id": "c0cb8dd4bc7f5ac0e496772baae1a03255628f06",
      "gold_msg": "KAFKA-15036: Add a test case for controller failover ()",
      "code_change": "diff --git a/core/src/test/scala/integration/kafka/server/KRaftClusterTest.scala b/core/src/test/scala/integration/kafka/server/KRaftClusterTest.scala\nindex 2de4b8c7e864..01ca60e56107 100644\n--- a/core/src/test/scala/integration/kafka/server/KRaftClusterTest.scala\n+++ b/core/src/test/scala/integration/kafka/server/KRaftClusterTest.scala\n@@ -28,6 +28,7 @@ import org.apache.kafka.common.config.{ConfigException, ConfigResource}\n import org.apache.kafka.common.config.ConfigResource.Type\n import org.apache.kafka.common.errors.PolicyViolationException\n import org.apache.kafka.common.message.DescribeClusterRequestData\n+import org.apache.kafka.common.metrics.Metrics\n import org.apache.kafka.common.network.ListenerName\n import org.apache.kafka.common.protocol.Errors._\n import org.apache.kafka.common.quota.{ClientQuotaAlteration, ClientQuotaEntity, ClientQuotaFilter, ClientQuotaFilterComponent}\n@@ -81,7 +82,7 @@ class KRaftClusterTest {\n   }\n \n   @Test\n-  def testCreateClusterAndRestartNode(): Unit = {\n+  def testCreateClusterAndRestartBrokerNode(): Unit = {\n     val cluster = new KafkaClusterTestKit.Builder(\n       new TestKitNodes.Builder().\n         setNumBrokerNodes(1).\n@@ -97,6 +98,35 @@ class KRaftClusterTest {\n     }\n   }\n \n+  @Test\n+  def testCreateClusterAndRestartControllerNode(): Unit = {\n+    val cluster = new KafkaClusterTestKit.Builder(\n+      new TestKitNodes.Builder().\n+        setNumBrokerNodes(1).\n+        setNumControllerNodes(3).build()).build()\n+    try {\n+      cluster.format()\n+      cluster.startup()\n+      val controller = cluster.controllers().values().iterator().asScala.filter(_.controller.isActive).next()\n+      val port = controller.socketServer.boundPort(controller.config.controllerListeners.head.listenerName)\n+\n+      // shutdown active controller\n+      controller.shutdown()\n+      // Rewrite The `listeners` config to avoid controller socket server init using different port\n+      val config = controller.sharedServer.controllerConfig.props\n+      config.asInstanceOf[java.util.HashMap[String,String]].put(KafkaConfig.ListenersProp, s\"CONTROLLER://localhost:$port\")\n+      controller.sharedServer.controllerConfig.updateCurrentConfig(new KafkaConfig(config))\n+      //  metrics will be set to null when closing a controller, so we should recreate it for testing\n+      controller.sharedServer.metrics = new Metrics()\n+\n+      // restart controller\n+      controller.startup()\n+      TestUtils.waitUntilTrue(() => cluster.controllers().values().iterator().asScala.exists(_.controller.isActive), \"Timeout waiting for new controller election\")\n+    } finally {\n+      cluster.close()\n+    }\n+  }\n+\n   @Test\n   def testCreateClusterAndWaitForBrokerInRunningState(): Unit = {\n     val cluster = new KafkaClusterTestKit.Builder(",
      "candidates": [
        {
          "method": "Sanker",
          "text": "Here is a suggested commit message based on the diff:\n\n`Add test for restarting a controller node in a KRaft cluster`\n\nThis commit message briefly summarizes the changes made in the diff, which includes adding a new test method `testCreateClusterAndRestartControllerNode` to test the scenario of restarting a controller node in a KRaft cluster.",
          "label": "A"
        },
        {
          "method": "NNGen",
          "text": "KAFKA-14242: use mock managers to avoid duplicated resource allocation ()",
          "label": "B"
        },
        {
          "method": "SRCMG",
          "text": "MINOR: add testCreateClusterAndRestartControllerNode ()",
          "label": "C"
        },
        {
          "method": "COME",
          "text": "MINOR: enable KRaftClusterTest.testCreateClusterAndRestartNode ()",
          "label": "D"
        },
        {
          "method": "ERICommiter",
          "text": "MINOR: Add test for restarting a KRaft controller node\n\nThis commit enhances the `KRaftClusterTest` by introducing a new test method `testCreateClusterAndRestartControllerNode`. The new test method verifies the ability to create a",
          "label": "E"
        }
      ],
      "question_id": 22
    },
    {
      "language": "python",
      "commit_id": "a023c0bdd545f1333a547aeafc2ff38c42e1b48f",
      "gold_msg": "message_edit: Extract function to check whether message is valid.",
      "code_change": "diff --git a/static/js/message_edit.js b/static/js/message_edit.js\nindex ba09103d46a78..0a250281603de 100644\n--- a/static/js/message_edit.js\n+++ b/static/js/message_edit.js\n@@ -98,12 +98,9 @@ function is_widget_message(message) {\n     return false;\n }\n \n-export function get_editability(message, edit_limit_seconds_buffer = 0) {\n+export function is_message_editable_ignoring_permissions(message) {\n     if (!message) {\n-        return editability_types.NO;\n-    }\n-    if (!is_topic_editable(message, edit_limit_seconds_buffer)) {\n-        return editability_types.NO;\n+        return false;\n     }\n \n     if (message.failed_request) {\n@@ -112,12 +109,27 @@ export function get_editability(message, edit_limit_seconds_buffer = 0) {\n         //       other message updates.  This commit changed the result\n         //       from FULL to NO, since the prior implementation was\n         //       buggy.\n-        return editability_types.NO;\n+        return false;\n     }\n \n     // Locally echoed messages are not editable, since the message hasn't\n     // finished being sent yet.\n     if (message.locally_echoed) {\n+        return false;\n+    }\n+\n+    if (currently_echoing_messages.has(message.id)) {\n+        return false;\n+    }\n+    return true;\n+}\n+\n+export function get_editability(message, edit_limit_seconds_buffer = 0) {\n+    if (!is_message_editable_ignoring_permissions(message)) {\n+        return editability_types.NO;\n+    }\n+\n+    if (!is_topic_editable(message, edit_limit_seconds_buffer)) {\n         return editability_types.NO;\n     }\n \n@@ -133,10 +145,6 @@ export function get_editability(message, edit_limit_seconds_buffer = 0) {\n         return editability_types.FULL;\n     }\n \n-    if (currently_echoing_messages.has(message.id)) {\n-        return editability_types.NO;\n-    }\n-\n     if (\n         page_params.realm_message_content_edit_limit_seconds +\n             edit_limit_seconds_buffer +",
      "candidates": [
        {
          "method": "Sanker",
          "text": "Refactor message editability checks into separate function for permission-ignoring case\n\nAlternatively, a more concise commit message could be:\n\nExtract permission-ignoring editability check into separate function",
          "label": "A"
        },
        {
          "method": "COME",
          "text": "message_edit: Rename get_editability function.",
          "label": "B"
        },
        {
          "method": "SRCMG",
          "text": "message_edit: Refactor message editability checks.",
          "label": "C"
        },
        {
          "method": "ERICommiter",
          "text": "### Commit Messages for Code Changes\n\n#### 1. unread: Update class name for unread direct message counter.\n\nRenamed the class `UnreadPMCounter` to `UnreadDirectMessageCounter` to improve clarity and consistency in terminology across the codebase for",
          "label": "D"
        },
        {
          "method": "NNGen",
          "text": "popovers: Remove part of `reminder` feature.",
          "label": "E"
        }
      ],
      "question_id": 23
    },
    {
      "language": "java",
      "commit_id": "75b938d0f60e36d04f670cf24ab284582a9f3b51",
      "gold_msg": "Update docker version to 20.10.21",
      "code_change": "diff --git a/ci/images/get-docker-url.sh b/ci/images/get-docker-url.sh\nindex cff2b1749eff..3fbb974c0e2b 100755\n--- a/ci/images/get-docker-url.sh\n+++ b/ci/images/get-docker-url.sh\n@@ -1,5 +1,5 @@\n #!/bin/bash\n set -e\n \n-version=\"20.10.20\"\n+version=\"20.10.21\"\n echo \"https://download.docker.com/linux/static/stable/x86_64/docker-$version.tgz\";",
      "candidates": [
        {
          "method": "NNGen",
          "text": "Upgrade CI images to Docker 20.10.21",
          "label": "A"
        },
        {
          "method": "COME",
          "text": "Upgrade CI to Docker 20.10.21",
          "label": "B"
        },
        {
          "method": "ERICommiter",
          "text": "Upgrade CI images to Docker 20.10.21\n\nThis commit updates the Docker version used in the CI pipeline from 20.10.20 to 20.10.21. This ensures that the CI processes benefit from the latest bug fixes",
          "label": "C"
        },
        {
          "method": "Sanker",
          "text": "Update Docker version to 20.10.21 in get-docker-url.sh",
          "label": "D"
        },
        {
          "method": "SRCMG",
          "text": "Upgrade CI images to Docker 20.10.21",
          "label": "E"
        }
      ],
      "question_id": 24
    },
    {
      "language": "python",
      "commit_id": "c4a527fedfc8e6a909fb01aa6133e8e001da5a6f",
      "gold_msg": "docs: Update changelog with changes staged for 6.0.",
      "code_change": "diff --git a/docs/overview/changelog.md b/docs/overview/changelog.md\nindex de8bb0742c027..b093d0f68c510 100644\n--- a/docs/overview/changelog.md\n+++ b/docs/overview/changelog.md\n@@ -13,58 +13,102 @@ log][commit-log] for an up-to-date list of raw changes.\n \n #### Highlights\n \n-- Added support for Ubuntu 22.04.\n-- Removed support for Debian 10 due to its approaching end-of-life\n-  upstream.\n-- Added new display setting to display users' names next to emoji\n-  reactions when at most 3 users have reacted to a message. This saves\n-  effort hovering over the reaction when the identity of the user who\n-  reacted is important to the meaning.\n-- Added new compose box button to navigate to the topic being composed\n-  to, when that is different from the current view.\n+- Users can now mark messages as unread.\n+- Added support for viewing read receipts, along with settings\n+  allowing both organizations and individual users to disable them.\n+- Added new compose box button to navigate to the conversation being\n+  composed to, when that is different from the current view.\n - Added a scroll-to-bottom button, analogous to the `End` shortcut,\n   that appears only when scrolling using the mouse.\n+- Added support for up to 2 custom profile fields being highlighted in\n+  a user's profile summary popover, and added support for a new\n+  Pronouns custom field type designed to take advantage of\n+  it. Redesigned the custom profile fields administrative UI.\n+- Redesigned the left sidebar to better organize pinned and inactive\n+  streams, highlight topics where the user was mentioned, and better\n+  advertise streams that the current user can subscribe to.\n+- Replaced the previous \"away\" status with a \"Go invisible\" feature\n+  that better matches user intuition about what it does.\n+- The right sidebar now displays user status messages by default, with\n+  an optional compact design available.\n - The [public access option][public-access-option] was enhanced to\n   skip the login page by default, support switching themes and\n   languages, and add many other UI improvements.\n-- Added beta support for user groups to have subgroups, and for some\n-  permissions settings to be managed using user groups. Over the\n-  coming releases, we plan to migrate all Zulip permissions settings\n-  to be based on this more flexible groups-based system. We expect the\n-  migration to be fully backwards-compatible.\n+- Incoming webhook integrations now support filtering which classes of\n+  events are sent into Zulip; this can be invaluable when the\n+  third-party outgoing webhook .\n+- Added support for Ubuntu 22.04.\n+- Removed support for Debian 10 and PostgreSQL 10 due to their\n+  approaching end-of-life upstream.\n+- New integrations: Azure DevOps, RhodeCode, wekan.\n \n [public-access-option]: https://blog.zulip.com/2022/05/05/public-access-option/\n \n #### Full feature changelog\n \n+- Redesigned the message actions popover to have a cleaner design.\n+- Redesigned moving messages to have a cleaner, more consistent UI\n+  that is no longer combined with the message editing UI. One can now\n+  choose whether to send automated notices when moving messages within\n+  a stream (previously those were only available when moving messages\n+  between streams).\n+- Redesigned full user profiles to have a cleaner look and also\n+  display user IDs, which can be important when using the API. Users\n+  can now administer bot stream subscriptions from the bot's full\n+  profile.\n+- Redesigned several organization settings pages to have more\n+  consistent design.\n+- Redesigned the footer for self-hosted Zulip servers to no longer\n+  link to zulip.com marketing pages.\n+- Redesigned the 500 error pages for self-hosted Zulip servers to be\n+  clearer and link to the Zulip server troubleshooting guide.\n+- Redesigned the interface for configuring message editing and\n+  deletion permissions to be simpler and easier to understand.\n - Improved Recent Topics. The timestamp links now go to the latest\n-  message in the topic, and many subtle changes.\n+  message in the topic, arrow key navigation was improved, and many\n+  other bug fixes or subtle improvements.\n+- Added support for modern unicode emoji which had previously been\n+  unavailable in Zulip. Users using the deprecated \"Google blobs\"\n+  emoji set are automatically migrated to the modern \"Google\" emoji\n+  set. The \"Google blobs\" emoji set remains available for users who\n+  prefer it (with the modern \"Google\" emoji set used for modern emoji\n+  that do not exist in that emoji set).\n - Added support for changing the role of bots in the UI; previously,\n   this was only possible via the API.\n+- Added confirmation modals for various destructive actions like\n+  deactivating bots that were missing them.\n+- Added new summary statistics on the organization analytics\n+  page. Fixed several bugs with the display of graphs.\n+- Added support for administrators sending a final email to a user as\n+  part of deactivating their Zulip account.\n - Added API endpoint to get a single stream by ID.\n-- Added new RhodeCode webhook integration.\n+- Added beta support for user groups to have subgroups, and for some\n+  permissions settings to be managed using user groups. Over the\n+  coming releases, we plan to migrate all Zulip permissions settings\n+  to be based on this more flexible groups-based system. We currently\n+  expect this migration to be fully backwards-compatible.\n - Zulip's automated emails use the `X-Auto-Response-Suppress` header\n   to reduce auto-responder replies.\n-- Redesigned full user profiles to have a cleaner look and also\n-  display user IDs, which can be important when using the API.\n-- Redesigned several organization settings pages to have more\n-  consistent design.\n-- Redesigned the footer for self-hosted Zulip servers to no longer\n-  contain all of the zulip.com marketing pages.\n+- Changed various icons to be more intuitive. The bell-based icon for\n+  muted topics has been replaced by a more standard speaker-based icon.\n - Reworked how a new user's language is set to prefer the browser's\n   configured language over the organization default language, which\n   has been renamed to reflect its remaining role as the language used\n   for automated notifications visible to many users.\n-- Improved UI for moving topics with better labels, typeahead,\n-  default notices, and cleaner interaction.\n+- The Drafts panel now prioritizes drafts matching the current view.\n+- New automated notification to the \"stream events\" topic when\n+  changing a stream's privacy settings.\n+- Improved the search typeahead to show profile pictures for users.\n - Improved typeahead matching algorithm for stream/user/emoji names\n   containing multiple spaces and other corner cases.\n-- Improved Help Center documentation, including mobile documentation\n-  for common workflows and many polish improvements.\n+- Improved the Help Center, including better display of keyboard\n+  shortcuts, mobile documentation for common workflows and many polish\n+  improvements.\n - Improved API documentation, including new page on roles and\n-  permissions, an audit to correct missing **Changes**, entries, etc.\n+  permissions, an audit to correct missing **Changes** entries, and\n+  new documentation for several previously undocumented endpoints.\n - Improved Python static type-checking to make use of Django stubs for\n-  `mypy`, fixing many minor bugs.\n+  `mypy`, fixing many minor bugs in the process.\n - Improved RealmAuditLog to cover several previously unauditable changes.\n - Improved the soft reactivation user experience; users who receive an\n   email notification or push notification because of a personal\n@@ -73,8 +117,22 @@ log][commit-log] for an up-to-date list of raw changes.\n   time they visit Zulip after seeing the notification.\n - Improved user deactivation modal to provide details about bots and\n   invitations that will be disabled.\n+- Improve matching algorithm for left sidebar stream filtering.\n - Improved several integrations, including Harbor, NewRelic, and the\n   Slack compatible incoming webhook.\n+- Improved mention typeahead and rendering for cases where mention\n+  syntax appears next to symbols.\n+- Improve the explanations in message notification emails explaining\n+  why the notification was sent.\n+- Improved many Help Center articles to more clearly explain features\n+  or document how to access those features from the mobile apps.\n+- Increased timeout for processing slow requests from 20s to 60s.\n+- Removed limits that prevented replying to Zulip email notifications\n+  several times or several days after receiving it.\n+- Fixed numerous bugs and performance issues with the Rocket.Chat data\n+  import tool.\n+- Fixed several bugs where drafts could fail to be saved.\n+- Fixed a bug where copy-paste would incorrectly copy an entire message.\n - Fixed the app's main loading page to not suggest reloading until\n   several seconds have passed.\n - Fixed a bug where public streams imported from other chat systems\n@@ -82,16 +140,21 @@ log][commit-log] for an up-to-date list of raw changes.\n   configuration not otherwise possible in Zulip.\n - Fixed several subtle bugs involving editing custom profile field\n   configuration.\n+- Fixed several bugs involving compose box keyboard shortcuts.\n - Fixed dozens of settings UI interaction design bugs.\n - Fixed subtle caching bugs in the URL preview system.\n+- Fixed several rare race conditions in the server implementation.\n - Fixed many CSS corner cases issues involving content overflowing containers.\n - Fixed entering an emoji in the mobile web app using an emoji\n   keyboard.\n - Fixed several subtle bugs with confirmation links.\n - Fixed a subtle performance issue for full-text search for uncommon words.\n+- Fixed the estimator for the size of public data exports.\n+- Major improvements to our documentation for setting up the development\n+  environment and for joining the project as a new contributor.\n - Extracted several JavaScript modules to share code with the mobile\n   app.\n-- Upgraded many third-party dependencies including Django 4.0, and\n+- Upgraded many third-party dependencies including Django 4.1, and\n   substantially modernized the Python codebase.\n \n #### Upgrade notes for 6.0\n@@ -101,6 +164,12 @@ log][commit-log] for an up-to-date list of raw changes.\n   `azure_oauth2_secret` secret was renamed to\n   `social_auth_azuread_oauth2_secret`, to match our other external\n   authentication methods.\n+- This release contains an expensive migration,\n+  `0419_backfill_message_realm`, which adds data to a new `realm`\n+  column in the message table. Expect it to run for 10-15 minutes per\n+  million messages in the database. The new column is not yet used in\n+  this release, so this migration can be run in the background for\n+  installations hoping to avoid extended downtime.\n \n ## Zulip 5.x series",
      "candidates": [
        {
          "method": "Sanker",
          "text": "Here is a possible commit message based on the diff:\n\n`Release Zulip 6.0 with numerous new features, improvements, and bug fixes`\n\nThis commit message captures the essence of the changes, which include a wide range of new features, improvements, and bug fixes, as indicated by the extensive diff. The message is concise and informative, providing a high-level summary of the changes.",
          "label": "A"
        },
        {
          "method": "SRCMG",
          "text": "docs: Update changelog with changes for 6.0.",
          "label": "B"
        },
        {
          "method": "COME",
          "text": "docs: Update changelog for 2022.2.0.",
          "label": "C"
        },
        {
          "method": "ERICommiter",
          "text": "docs: Update changelog with recent features and improvements.\n\n- Added support for marking messages as unread and viewing read receipts with configurable settings for both users and organizations.\n- Introduced a new compose box button for navigating to different conversations, along with a scroll",
          "label": "D"
        },
        {
          "method": "NNGen",
          "text": "docs: Copy-edit changelog for clarity.",
          "label": "E"
        }
      ],
      "question_id": 25
    },
    {
      "language": "java",
      "commit_id": "37e0ea514209f98e07136d7b2ac9d7260ff4f25e",
      "gold_msg": "Upgrade to Neo4j Java Driver 4.4.9",
      "code_change": "diff --git a/spring-boot-project/spring-boot-dependencies/build.gradle b/spring-boot-project/spring-boot-dependencies/build.gradle\nindex e0bd5e5288b8..4c725bd44915 100644\n--- a/spring-boot-project/spring-boot-dependencies/build.gradle\n+++ b/spring-boot-project/spring-boot-dependencies/build.gradle\n@@ -1334,7 +1334,7 @@ bom {\n \t\t\t]\n \t\t}\n \t}\n-\tlibrary(\"Neo4j Java Driver\", \"4.4.6\") {\n+\tlibrary(\"Neo4j Java Driver\", \"4.4.9\") {\n \t\tgroup(\"org.neo4j.driver\") {\n \t\t\tmodules = [\n \t\t\t\t\"neo4j-java-driver\"",
      "candidates": [
        {
          "method": "COME",
          "text": "Upgrade to Neo4j Java Driver 4.4.9",
          "label": "A"
        },
        {
          "method": "Sanker",
          "text": "Here is a short commit message based on the diff:\n\n\"Bump Neo4j Java Driver to 4.4.9\"",
          "label": "B"
        },
        {
          "method": "NNGen",
          "text": "Upgrade to Neo4j Java Driver 4.4.6",
          "label": "C"
        },
        {
          "method": "ERICommiter",
          "text": "Upgrade Neo4j Java Driver to version 4.4.9\n\n- Updated the Neo4j Java Driver dependency from version 4.4.6 to 4.4.9 in the build.gradle file.\n- This update ensures that",
          "label": "D"
        },
        {
          "method": "SRCMG",
          "text": "Upgrade to Neo4j Java Driver 4.4.9",
          "label": "E"
        }
      ],
      "question_id": 26
    },
    {
      "language": "python",
      "commit_id": "85a7884f11a5200535706a6c5d31a9acbdadae1a",
      "gold_msg": "Lint fixes",
      "code_change": "diff --git a/tests/vcs/test_clone.py b/tests/vcs/test_clone.py\nindex ef62ef587..bd19ef1ab 100644\n--- a/tests/vcs/test_clone.py\n+++ b/tests/vcs/test_clone.py\n@@ -129,7 +129,9 @@ def test_clone_should_invoke_vcs_command(\n         branch_info.insert(0, \"--\")\n \n     mock_subprocess.assert_any_call(\n-        [repo_type, 'checkout', *branch_info], cwd=expected_repo_dir, stderr=subprocess.STDOUT\n+        [repo_type, 'checkout', *branch_info],\n+        cwd=expected_repo_dir,\n+        stderr=subprocess.STDOUT,\n     )",
      "candidates": [
        {
          "method": "COME",
          "text": "fix lint",
          "label": "A"
        },
        {
          "method": "NNGen",
          "text": "Remove strings from vcs.clone tests",
          "label": "B"
        },
        {
          "method": "Sanker",
          "text": "\"Improve code formatting in test_clone.py for better readability\" \n\nAlternatively, a more specific message could be: \n\n\"Format subprocess call in test_clone.py for consistency\"",
          "label": "C"
        },
        {
          "method": "SRCMG",
          "text": "Format checkout command in vcs test",
          "label": "D"
        },
        {
          "method": "ERICommiter",
          "text": "Refactor `test_clone.py` for readability by splitting argument list across multiple lines",
          "label": "E"
        }
      ],
      "question_id": 27
    },
    {
      "language": "java",
      "commit_id": "e9ca6114a8db8a0c77766b255e270d6ac08fa8bf",
      "gold_msg": "use unwrapped foreign object in ForeignExceptionInterop",
      "code_change": "diff --git a/espresso/src/com.oracle.truffle.espresso/src/com/oracle/truffle/espresso/runtime/dispatch/ForeignExceptionInterop.java b/espresso/src/com.oracle.truffle.espresso/src/com/oracle/truffle/espresso/runtime/dispatch/ForeignExceptionInterop.java\nindex e8801456034a..6e57ed44af99 100644\n--- a/espresso/src/com.oracle.truffle.espresso/src/com/oracle/truffle/espresso/runtime/dispatch/ForeignExceptionInterop.java\n+++ b/espresso/src/com.oracle.truffle.espresso/src/com/oracle/truffle/espresso/runtime/dispatch/ForeignExceptionInterop.java\n@@ -33,6 +33,10 @@\n @ExportLibrary(value = InteropLibrary.class, receiverType = StaticObject.class)\n public class ForeignExceptionInterop extends ThrowableInterop {\n \n+    private static Object getRawForeignObject(StaticObject object) {\n+        assert object.getKlass() == getMeta().polyglot.ForeignException;\n+        return getMeta().java_lang_Throwable_backtrace.getObject(object).rawForeignObject(object.getKlass().getContext().getLanguage());\n+    }\n     @ExportMessage\n     public static ExceptionType getExceptionType(@SuppressWarnings(\"unused\") StaticObject receiver) {\n         return ExceptionType.RUNTIME_ERROR;\n@@ -41,34 +45,31 @@ public static ExceptionType getExceptionType(@SuppressWarnings(\"unused\") StaticO\n     @ExportMessage\n     public static boolean hasExceptionCause(StaticObject object) {\n         object.checkNotForeign();\n-        Object rawForeignException = getMeta().java_lang_Throwable_backtrace.getObject(object);\n+        Object rawForeignException = getRawForeignObject(object);\n         return InteropLibrary.getUncached().hasExceptionCause(rawForeignException);\n     }\n \n     @ExportMessage\n     public static Object getExceptionCause(StaticObject object) throws UnsupportedMessageException {\n         object.checkNotForeign();\n-        Object rawForeignException = getMeta().java_lang_Throwable_backtrace.getObject(object);\n-        return InteropLibrary.getUncached().getExceptionCause(rawForeignException);\n+        return InteropLibrary.getUncached().getExceptionCause(getRawForeignObject(object));\n     }\n \n     @ExportMessage\n     public static boolean hasExceptionMessage(StaticObject object) {\n         object.checkNotForeign();\n-        Object rawForeignException = getMeta().java_lang_Throwable_backtrace.getObject(object);\n-        return InteropLibrary.getUncached().hasExceptionMessage(rawForeignException);\n+        return InteropLibrary.getUncached().hasExceptionMessage(getRawForeignObject(object));\n     }\n \n     @ExportMessage\n     public static Object getExceptionMessage(StaticObject object) throws UnsupportedMessageException {\n         object.checkNotForeign();\n-        Object rawForeignException = getMeta().java_lang_Throwable_backtrace.getObject(object);\n-        return InteropLibrary.getUncached().getExceptionMessage(rawForeignException);\n+        return InteropLibrary.getUncached().getExceptionMessage(getRawForeignObject(object));\n     }\n \n     @ExportMessage\n     public static RuntimeException throwException(StaticObject object) {\n         object.checkNotForeign();\n-        throw (RuntimeException) getMeta().java_lang_Throwable_backtrace.getObject(object).rawForeignObject(object.getKlass().getContext().getLanguage());\n+        throw (RuntimeException) getRawForeignObject(object);\n     }\n }",
      "candidates": [
        {
          "method": "SRCMG",
          "text": "extract method for retrieving raw foreign object",
          "label": "A"
        },
        {
          "method": "Sanker",
          "text": "Extract common logic for getting raw foreign object in ForeignExceptionInterop.",
          "label": "B"
        },
        {
          "method": "NNGen",
          "text": "throw UnsupportedMessageException according to spec in ThrowableInterop",
          "label": "C"
        },
        {
          "method": "ERICommiter",
          "text": "Refactor ForeignExceptionInterop to introduce `getRawForeignObject` method\n\n- Added a private static method `getRawForeignObject` for encapsulating the logic of obtaining the raw foreign object from a `StaticObject`.\n- Updated various methods to utilize",
          "label": "D"
        },
        {
          "method": "COME",
          "text": "add check for null value in ForeignExceptionInterop",
          "label": "E"
        }
      ],
      "question_id": 28
    },
    {
      "language": "python",
      "commit_id": "505a9119bac7d947104342c7bd4289ca7d9a7ed5",
      "gold_msg": "stream_popover: Remove unnecessary resize call.",
      "code_change": "diff --git a/static/js/stream_popover.js b/static/js/stream_popover.js\nindex bef37dea3fa22..2c0e84746032f 100644\n--- a/static/js/stream_popover.js\n+++ b/static/js/stream_popover.js\n@@ -25,7 +25,6 @@ import * as message_edit from \"./message_edit\";\n import * as muted_topics_ui from \"./muted_topics_ui\";\n import {page_params} from \"./page_params\";\n import * as popovers from \"./popovers\";\n-import * as resize from \"./resize\";\n import * as settings_data from \"./settings_data\";\n import * as starred_messages from \"./starred_messages\";\n import * as starred_messages_ui from \"./starred_messages_ui\";\n@@ -167,12 +166,8 @@ export function hide_drafts_popover() {\n     }\n }\n \n-// These are the only two functions that is really shared by the\n-// two popovers, so we could split out topic stuff to\n-// another module pretty easily.\n export function show_streamlist_sidebar() {\n     $(\".app-main .column-left\").addClass(\"expanded\");\n-    resize.resize_page_components();\n }\n \n export function hide_streamlist_sidebar() {",
      "candidates": [
        {
          "method": "ERICommiter",
          "text": "stream_popover: Remove unnecessary resize logic for sidebar.\n\nThe previous code included a call to `resize.resize_page_components()` when showing the streamlist sidebar, which recalculated the size of various page components. This logic has been removed because it is not",
          "label": "A"
        },
        {
          "method": "NNGen",
          "text": "resize: Adjust left_side_userlist sizes when showing sidebar.",
          "label": "B"
        },
        {
          "method": "COME",
          "text": "popovers: Remove unused resize function from stream_popover.",
          "label": "C"
        },
        {
          "method": "SRCMG",
          "text": "stream_popover: Simplify streamlist sidebar expansion.",
          "label": "D"
        },
        {
          "method": "Sanker",
          "text": "\"Remove unused import of resize module from stream_popover.js\"",
          "label": "E"
        }
      ],
      "question_id": 29
    },
    {
      "language": "java",
      "commit_id": "140010440d377a001135a643ffbf8b9428256175",
      "gold_msg": "Clean up Graal invariants checker",
      "code_change": "diff --git a/compiler/src/org.graalvm.compiler.core.test/src/org/graalvm/compiler/core/test/CheckGraalInvariants.java b/compiler/src/org.graalvm.compiler.core.test/src/org/graalvm/compiler/core/test/CheckGraalInvariants.java\nindex 7353b515a3a6..b46a471b8f24 100644\n--- a/compiler/src/org.graalvm.compiler.core.test/src/org/graalvm/compiler/core/test/CheckGraalInvariants.java\n+++ b/compiler/src/org.graalvm.compiler.core.test/src/org/graalvm/compiler/core/test/CheckGraalInvariants.java\n@@ -182,36 +182,9 @@ protected boolean shouldLoadClass(String className) {\n             if (className.equals(\"module-info\") || className.startsWith(\"META-INF.versions.\")) {\n                 return false;\n             }\n-            // @formatter:off\n-                /*\n-                 * Work around to prevent:\n-                 *\n-                 * org.graalvm.compiler.debug.GraalError: java.lang.IllegalAccessError: class org.graalvm.compiler.serviceprovider.GraalServices$Lazy (in module\n-                 * jdk.internal.vm.compiler) cannot access class java.lang.management.ManagementFactory (in module java.management) because module\n-                 * jdk.internal.vm.compiler does not read module java.management\n-                 *     at jdk.internal.vm.compiler/org.graalvm.compiler.debug.GraalError.shouldNotReachHere(GraalError.java:55)\n-                 *     at org.graalvm.compiler.core.test.CheckGraalInvariants$InvariantsTool.handleClassLoadingException(CheckGraalInvariants.java:149)\n-                 *     at org.graalvm.compiler.core.test.CheckGraalInvariants.initializeClasses(CheckGraalInvariants.java:321)\n-                 *     at org.graalvm.compiler.core.test.CheckGraalInvariants.runTest(CheckGraalInvariants.java:239)\n-                 *\n-                 * which occurs because JDK8 overlays are in modular jars. They are never used normally.\n-                 */\n-                // @formatter:on\n-            if (className.equals(\"org.graalvm.compiler.serviceprovider.GraalServices$Lazy\")) {\n-                return false;\n-            }\n-\n             return true;\n         }\n \n-        protected void handleClassLoadingException(Throwable t) {\n-            GraalError.shouldNotReachHere(t);\n-        }\n-\n-        protected void handleParsingException(Throwable t) {\n-            GraalError.shouldNotReachHere(t);\n-        }\n-\n         public boolean shouldVerifyFoldableMethods() {\n             return true;\n         }\n@@ -402,7 +375,6 @@ public static void runTest(InvariantsTool tool) {\n         if (errors.isEmpty()) {\n             // Order outer classes before the inner classes\n             classNames.sort((String a, String b) -> a.compareTo(b));\n-            // Initialize classes in single thread to avoid deadlocking issues during initialization\n             List\u003cClass\u003c?>> classes = loadClasses(tool, classNames);\n             for (Class\u003c?> c : classes) {\n                 String className = c.getName();\n@@ -446,18 +418,12 @@ public static void runTest(InvariantsTool tool) {\n                                         checkGraph(verifiers, context, graph);\n                                     } catch (VerificationError e) {\n                                         errors.add(e.getMessage());\n-                                    } catch (LinkageError e) {\n-                                        // suppress linkages errors resulting from eager resolution\n                                     } catch (BailoutException e) {\n                                         // Graal bail outs on certain patterns in Java bytecode\n                                         // (e.g.,\n                                         // unbalanced monitors introduced by jacoco).\n                                     } catch (Throwable e) {\n-                                        try {\n-                                            tool.handleParsingException(e);\n-                                        } catch (Throwable t) {\n-                                            errors.add(String.format(\"Error while checking %s:%n%s\", methodName, printStackTraceToString(e)));\n-                                        }\n+                                        errors.add(String.format(\"Error while checking %s:%n%s\", methodName, printStackTraceToString(e)));\n                                     }\n                                 }\n                             });\n@@ -579,16 +545,8 @@ private static List\u003cClass\u003c?>> loadClasses(InvariantsTool tool, List\u003cString> clas\n                 classes.add(c);\n             } catch (UnsupportedClassVersionError e) {\n                 // graal-test.jar can contain classes compiled for different Java versions\n-            } catch (NoClassDefFoundError e) {\n-                if (!e.getMessage().contains(\"Could not initialize class\")) {\n-                    throw e;\n-                } else {\n-                    // A second or later attempt to initialize a class\n-                    // results in this confusing error where the\n-                    // original cause of initialization failure is lost\n-                }\n             } catch (Throwable t) {\n-                tool.handleClassLoadingException(t);\n+                GraalError.shouldNotReachHere(t);\n             }\n         }\n         return classes;",
      "candidates": [
        {
          "method": "COME",
          "text": "Simplify comment",
          "label": "A"
        },
        {
          "method": "NNGen",
          "text": "Create logic to retrieve a phase plan from a file.",
          "label": "B"
        },
        {
          "method": "Sanker",
          "text": "\"Simplify exception handling in CheckGraalInvariants\"\n\nor \n\n\"Remove workaround for JDK8 overlays and simplify exception handling\"\n\nor \n\n\"Refactor CheckGraalInvariants to reduce exception handling complexity\"\n\nThese commit messages are based on the changes made in the diff, which include removing a workaround for JDK8 overlays, simplifying exception handling, and refactoring the CheckGraalInvariants class.",
          "label": "C"
        },
        {
          "method": "SRCMG",
          "text": "Remove obsolete error handling",
          "label": "D"
        },
        {
          "method": "ERICommiter",
          "text": "Simplify exception handling in `CheckGraalInvariants`.\n\n- Removed custom handling of class loading and parsing exceptions, instead directly logging errors.\n- Eliminated workarounds related to module access and JDK overlays.\n- Streamlined the test setup by",
          "label": "E"
        }
      ],
      "question_id": 30
    },
    {
      "language": "java",
      "commit_id": "448786bfd07243b3fc315e72ecd3724b4baf6e45",
      "gold_msg": "Upgrade to Kotlin 1.8.22",
      "code_change": "diff --git a/gradle.properties b/gradle.properties\nindex 9e7d099ff5be..b93fdaf29e40 100644\n--- a/gradle.properties\n+++ b/gradle.properties\n@@ -4,7 +4,7 @@ org.gradle.caching=true\n org.gradle.jvmargs=-Xmx2048m\n org.gradle.parallel=true\n \n-kotlinVersion=1.8.21\n+kotlinVersion=1.8.22\n \n kotlin.stdlib.default.dependency=false\n kotlin.jvm.target.validation.mode=ignore",
      "candidates": [
        {
          "method": "SRCMG",
          "text": "Upgrade to Kotlin 1.8.22",
          "label": "A"
        },
        {
          "method": "NNGen",
          "text": "Upgrade to Kotlin 1.7.0",
          "label": "B"
        },
        {
          "method": "Sanker",
          "text": "Here is a suitable commit message:\n\n\"Bump Kotlin version to 1.8.22\"",
          "label": "C"
        },
        {
          "method": "ERICommiter",
          "text": "Upgrade to Kotlin 1.8.22",
          "label": "D"
        },
        {
          "method": "COME",
          "text": "Upgrade to Kotlin 1.8.22",
          "label": "E"
        }
      ],
      "question_id": 31
    },
    {
      "language": "python",
      "commit_id": "9271d25ca4cfa458deb068ccf14d2654516ff48a",
      "gold_msg": "Overhauled extension debugging guide ()",
      "code_change": "diff --git a/doc/source/development/debugging_extensions.rst b/doc/source/development/debugging_extensions.rst\nindex 32cb8f4c4d8cd..8fa9c94ae96c9 100644\n--- a/doc/source/development/debugging_extensions.rst\n+++ b/doc/source/development/debugging_extensions.rst\n@@ -6,126 +6,10 @@\n Debugging C extensions\n ======================\n \n-Pandas uses select C extensions for high performance IO operations. In case you need to debug segfaults or general issues with those extensions, the following steps may be helpful.\n+Pandas uses Cython and C/C++ `extension modules \u003chttps://docs.python.org/3/extending/extending.html>`_ to optimize performance. Unfortunately, the standard Python debugger does not allow you to step into these extensions. Cython extensions can be debugged with the `Cython debugger \u003chttps://docs.cython.org/en/latest/src/userguide/debugging.html>`_ and C/C++ extensions can be debugged using the tools shipped with your platform's compiler.\n \n-First, be sure to compile the extensions with the appropriate flags to generate debug symbols and remove optimizations. This can be achieved as follows:\n+For Python developers with limited or no C/C++ experience this can seem a daunting task. Core developer Will Ayd has written a 3 part blog series to help guide you from the standard Python debugger into these other tools:\n \n-.. code-block:: sh\n-\n-   python setup.py build_ext --inplace -j4 --with-debugging-symbols\n-\n-Using a debugger\n-================\n-\n-Assuming you are on a Unix-like operating system, you can use either lldb or gdb to debug. The choice between either is largely dependent on your compilation toolchain - typically you would use lldb if using clang and gdb if using gcc. For macOS users, please note that ``gcc`` is on modern systems an alias for ``clang``, so if using Xcode you usually opt for lldb. Regardless of which debugger you choose, please refer to your operating systems instructions on how to install.\n-\n-After installing a debugger you can create a script that hits the extension module you are looking to debug. For demonstration purposes, let's assume you have a script called ``debug_testing.py`` with the following contents:\n-\n-.. code-block:: python\n-\n-   import pandas as pd\n-\n-   pd.DataFrame([[1, 2]]).to_json()\n-\n-Place the ``debug_testing.py`` script in the project root and launch a Python process under your debugger. If using lldb:\n-\n-.. code-block:: sh\n-\n-   lldb python\n-\n-If using gdb:\n-\n-.. code-block:: sh\n-\n-   gdb python\n-\n-Before executing our script, let's set a breakpoint in our JSON serializer in its entry function called ``objToJSON``. The lldb syntax would look as follows:\n-\n-.. code-block:: sh\n-\n-   breakpoint set --name objToJSON\n-\n-Similarly for gdb:\n-\n-.. code-block:: sh\n-\n-   break objToJSON\n-\n-.. note::\n-\n-   You may get a warning that this breakpoint cannot be resolved in lldb. gdb may give a similar warning and prompt you to make the breakpoint on a future library load, which you should say yes to. This should only happen on the very first invocation as the module you wish to debug has not yet been loaded into memory.\n-\n-Now go ahead and execute your script:\n-\n-.. code-block:: sh\n-\n-   run \u003cthe_script>.py\n-\n-Code execution will halt at the breakpoint defined or at the occurrence of any segfault. LLDB's `GDB to LLDB command map \u003chttps://lldb.llvm.org/use/map.html>`_ provides a listing of debugger command that you can execute using either debugger.\n-\n-Another option to execute the entire test suite under lldb would be to run the following:\n-\n-.. code-block:: sh\n-\n-   lldb -- python -m pytest\n-\n-Or for gdb\n-\n-.. code-block:: sh\n-\n-   gdb --args python -m pytest\n-\n-Once the process launches, simply type ``run`` and the test suite will begin, stopping at any segmentation fault that may occur.\n-\n-Improve debugger printing\n-=========================\n-\n-By default your debug will simply print the type and memory address of a PyObject. Assuming we passed a list containing ``[\"a\", \"b\"]`` as an argument to a Cython-generated function with parameter ``obj``, debugging that object would look as follows:\n-\n-.. code-block:: sh\n-\n-   (gdb) p __pyx_v_obj\n-   $1 = (PyObject *) 0x5555558b91e0\n-\n-Dereferencing this will yield the standard PyObject struct members of the object, which provides some more visibility\n-\n-.. code-block:: sh\n-\n-   (gdb) p *__pyx_v_obj\n-   $2 = {ob_refcnt = 1, ob_type = 0x5555558b91e0 \u003cPyList_Type>}\n-\n-If you are using gdb, CPython provides an extension that prints out more useful information about the object you are inspecting. The extension can be found in `cpython/Tools/gdb/libpython.py \u003chttps://github.com/python/cpython/blob/main/Tools/gdb/libpython.py>`_; for best results be sure to use the gdb extension from the CPython branch that matches the version of your interpreter.\n-\n-To activate the extension you will need to execute ``source \u003cpath_to_cpython_source>/Tools/gdb/libpython.py`` from an actively-running gdb session. After loading you will get more detailed information about the Python object you are inspecting.\n-\n-.. code-block:: sh\n-\n-   (gdb) p __pyx_v_obj\n-   $3 = ['a', 'b']\n-\n-If you do not wish to explicitly source this file on every gdb run, you can alternately add it as a start up command to your `gdbinit \u003chttps://sourceware.org/gdb/onlinedocs/gdb/gdbinit-man.html>`_ file.\n-\n-Checking memory leaks with valgrind\n-===================================\n-\n-You can use `Valgrind \u003chttps://valgrind.org/>`_ to check for and log memory leaks in extensions. For instance, to check for a memory leak in a test from the suite you can run:\n-\n-.. code-block:: sh\n-\n-   PYTHONMALLOC=malloc valgrind --leak-check=yes --track-origins=yes --log-file=valgrind-log.txt python -m pytest \u003cpath_to_a_test>\n-\n-Note that code execution under valgrind will take much longer than usual. While you can run valgrind against extensions compiled with any optimization level, it is suggested to have optimizations turned off from compiled extensions to reduce the amount of false positives. The ``--with-debugging-symbols`` flag passed during package setup will do this for you automatically.\n-\n-.. note::\n-\n-   For best results, you should run use a Python installation configured with Valgrind support (--with-valgrind)\n-\n-\n-Easier code navigation\n-======================\n-\n-Generating a ``compile_commands.json`` file may make it easier to navigate the C extensions, as this allows your code editor to list references, jump to definitions, etc... To make this work with setuptools you can use `Bear \u003chttps://github.com/rizsotto/Bear>`_.\n-\n-.. code-block:: sh\n-\n-   bear -- python setup.py build_ext --inplace -j4 --with-debugging-symbols\n+  1. `Fundamental Python Debugging Part 1 - Python \u003chttps://willayd.com/fundamental-python-debugging-part-1-python.html>`_\n+  2. `Fundamental Python Debugging Part 2 - Python Extensions \u003chttps://willayd.com/fundamental-python-debugging-part-2-python-extensions.html>`_\n+  3. `Fundamental Python Debugging Part 3 - Cython Extensions \u003chttps://willayd.com/fundamental-python-debugging-part-3-cython-extensions.html>`_",
      "candidates": [
        {
          "method": "NNGen",
          "text": "Document better PyObject printing via gdb ()",
          "label": "A"
        },
        {
          "method": "SRCMG",
          "text": "Document debugging C extensions via external blog series ()",
          "label": "B"
        },
        {
          "method": "Sanker",
          "text": "\"Refactor debugging extensions documentation to point to Will Ayd's blog series for guidance\"\n\nThis commit message captures the essence of the changes made in the diff, which is to update the documentation for debugging extensions to reference Will Ayd's blog series, rather than providing detailed instructions on how to debug C extensions.",
          "label": "C"
        },
        {
          "method": "ERICommiter",
          "text": "Refactor debugging C extensions guide\n\n- Simplified the guide to focus on Cython and C/C++ extension modules, emphasizing their role in optimizing performance.\n- Removed detailed instructions on using specific debuggers (lldb, gdb) and included",
          "label": "D"
        },
        {
          "method": "COME",
          "text": "DOC: Fix broken link to C++ extensions ()",
          "label": "E"
        }
      ],
      "question_id": 32
    },
    {
      "language": "python",
      "commit_id": "8d891a5c37a90582fa85930134756cea74820cd2",
      "gold_msg": "Remove \"City, Warsaw Open Data\", it's broken",
      "code_change": "diff --git a/README.md b/README.md\nindex a52fe14b6d..ccd712eca7 100644\n--- a/README.md\n+++ b/README.md\n@@ -1026,7 +1026,6 @@ API | Description | Auth | HTTPS | CORS |\n | [City, New York Open Data](https://opendata.cityofnewyork.us/) | New York (US) City Open Data | No | Yes | Unknown |\n | [City, Prague Open Data](http://opendata.praha.eu/en) | Prague(CZ) City Open Data | No | No | Unknown |\n | [City, Toronto Open Data](https://open.toronto.ca/) | Toronto (CA) City Open Data | No | Yes | Yes |\n-| [City, Warsaw Open Data](https://api.um.warszawa.pl/) | Warsaw (PL) City Open Data | `apiKey` | Yes | Unknown |\n | [Code.gov](https://code.gov) | The primary platform for Open Source and code sharing for the U.S. Federal Government | `apiKey` | Yes | Unknown |\n | [Colorado Information Marketplace](https://data.colorado.gov/) | Colorado State Government Open Data | No | Yes | Unknown |\n | [Data USA](https://datausa.io/about/api/) | US Public Data | No | Yes | Unknown |",
      "candidates": [
        {
          "method": "ERICommiter",
          "text": "Remove \"City, Warsaw Open Data\", it's broken",
          "label": "A"
        },
        {
          "method": "NNGen",
          "text": "Remove \"City, Kyiv\", it's broken",
          "label": "B"
        },
        {
          "method": "COME",
          "text": "Update Warsaw Open Data, new link",
          "label": "C"
        },
        {
          "method": "Sanker",
          "text": "Removed Warsaw Open Data from API list",
          "label": "D"
        },
        {
          "method": "SRCMG",
          "text": "Remove \"City, Warsaw\", it's broken",
          "label": "E"
        }
      ],
      "question_id": 33
    },
    {
      "language": "java",
      "commit_id": "37026c59d24ca1451e2643ee13451525af683beb",
      "gold_msg": "GP-879 added script method askAddr with default value",
      "code_change": "diff --git a/Ghidra/Features/Base/src/main/java/ghidra/app/script/GhidraScript.java b/Ghidra/Features/Base/src/main/java/ghidra/app/script/GhidraScript.java\nindex f27a5c538d6..7014ddf7675 100644\n--- a/Ghidra/Features/Base/src/main/java/ghidra/app/script/GhidraScript.java\n+++ b/Ghidra/Features/Base/src/main/java/ghidra/app/script/GhidraScript.java\n@@ -2505,13 +2505,60 @@ public Address parseAddress(String val) {\n \t * \t\t\tsecond part of the variable name (in headless mode or when using .properties file)\n \t * @return the user-specified Address value\n \t * @throws CancelledException if the user hit the 'cancel' button in GUI mode\n-\t * @throws IllegalArgumentException if in headless mode, there was a missing or\tinvalid Address\n+\t * @throws IllegalArgumentException if in headless mode, there was a missing or invalid Address\n \t * \t\t\tspecified in the .properties file\n \t */\n \tpublic Address askAddress(String title, String message) throws CancelledException {\n+\t\treturn askAddress(title, message, null);\n+\t}\n+\t\n+\t/**\n+\t * Returns an Address, using the String parameters for guidance.  The actual behavior of the\n+\t * method depends on your environment, which can be GUI or headless.\n+\t * \u003cp>\n+\t * Regardless of environment -- if script arguments have been set, this method will use the\n+\t * next argument in the array and advance the array index so the next call to an ask method\n+\t * will get the next argument.  If there are no script arguments and a .properties file\n+\t * sharing the same base name as the Ghidra Script exists (i.e., Script1.properties for\n+\t * Script1.java), then this method will then look there for the String value to return.\n+\t * The method will look in the .properties file by searching for a property name that is a\n+\t * space-separated concatenation of the input String parameters (title + \" \" + message).\n+\t * If that property name exists and its value represents a valid Address value, then the\n+\t * .properties value will be used in the following way:\n+\t * \u003col>\n+\t * \t\t\u003cli>In the GUI environment, this method displays a popup dialog that prompts the user\n+\t * \t\t\tfor an address value. If the same popup has been run before in the same session,\n+\t * \t\t\tthe address input field will be pre-populated with the last-used address. If not,\n+\t * \t\t\tthe\taddress input field will be pre-populated with the .properties value (if it\n+\t * \t\t\texists).\u003c/li>\n+\t *\t\t\u003cli>In the headless environment, this method returns an Address representing the\n+\t *\t\t\t.properties value (if it exists), or throws an Exception if there is an invalid or\n+\t *\t\t\tmissing .properties value.\u003c/li>\n+\t * \u003c/ol>\n+\t *\n+\t *\n+\t * @param title the title of the dialog (in GUI mode) or the first part of the variable name\n+\t * \t\t\t(in headless mode or when using .properties file)\n+\t * @param message the message to display next to the input field (in GUI mode) or the\n+\t * \t\t\tsecond part of the variable name (in headless mode or when using .properties file)\n+\t * @param defaultValue the optional default address as a String - if null is passed or an invalid \n+\t * \t\t\taddress is given no default will be shown in dialog\n+\t * @return the user-specified Address value\n+\t * @throws CancelledException if the user hit the 'cancel' button in GUI mode\n+\t * @throws IllegalArgumentException if in headless mode, there was a missing or invalid Address\n+\t * \t\t\tspecified in the .properties file\n+\t */\n+\tpublic Address askAddress(String title, String message, String defaultValue) throws CancelledException {\n \n \t\tString key = join(title, message);\n-\t\tAddress existingValue = loadAskValue(this::parseAddress, key);\n+\t\t\n+\t\tAddress defaultAddr = null;\n+\t\tif (defaultValue != null) {\n+\t\t\tdefaultAddr = currentProgram.getAddressFactory().getAddress(defaultValue);\n+\t\t}\n+\t\t\n+\t\t// if defaultAddr is null then it assumes no default value\n+\t\tAddress existingValue = loadAskValue(defaultAddr, this::parseAddress, key);\n \t\tif (isRunningHeadless()) {\n \t\t\treturn existingValue;\n \t\t}",
      "candidates": [
        {
          "method": "Sanker",
          "text": "Here is a possible commit message based on the diff:\n\n\"Added optional default address parameter to askAddress method\"\n\nThis commit message summarizes the main change introduced by the commit, which is the addition of a new parameter `defaultValue` to the `askAddress` method.",
          "label": "A"
        },
        {
          "method": "COME",
          "text": "GP-0 fix javadoc errors caused by GhidraScript",
          "label": "B"
        },
        {
          "method": "NNGen",
          "text": "GP-3147 - Fixed file chooser exception on cancel",
          "label": "C"
        },
        {
          "method": "ERICommiter",
          "text": "Enhance `askAddress` method in `GhidraScript` to support default address values and improve flexibility in both GUI and headless environments. Now, the method can pre-populate the address input field with either the last-used address or a",
          "label": "D"
        },
        {
          "method": "SRCMG",
          "text": "GP-0 add overloaded askAddress with default value",
          "label": "E"
        }
      ],
      "question_id": 34
    },
    {
      "language": "python",
      "commit_id": "88590e5a057a3aab34a40e2938bf82affda13775",
      "gold_msg": "Remove serializing deepcopy",
      "code_change": "diff --git a/manimlib/mobject/mobject.py b/manimlib/mobject/mobject.py\nindex 5c1b1576c4..f8660928f8 100644\n--- a/manimlib/mobject/mobject.py\n+++ b/manimlib/mobject/mobject.py\n@@ -587,11 +587,9 @@ def deserialize(self, data: bytes):\n         return self\n \n     def deepcopy(self):\n-        try:\n-            # Often faster than deepcopy\n-            return pickle.loads(pickle.dumps(self))\n-        except AttributeError:\n-            return copy.deepcopy(self)\n+        result = copy.deepcopy(self)\n+        result._shaders_initialized = False\n+        result._data_has_changed = True\n \n     @stash_mobject_pointers\n     def copy(self, deep: bool = False):",
      "candidates": [
        {
          "method": "NNGen",
          "text": "Whoops, make sure deepcopy actually returns",
          "label": "A"
        },
        {
          "method": "SRCMG",
          "text": "Refactor deepcopy to reset internal state",
          "label": "B"
        },
        {
          "method": "ERICommiter",
          "text": "Revert to standard deepcopy for Mobject.deepcopy\n\n- Removed the previous optimization attempt using `pickle` for deep copying due to potential attribute errors and performance considerations.\n- Reinstated the use of `copy.deepcopy` for object duplication, ensuring full compatibility",
          "label": "C"
        },
        {
          "method": "COME",
          "text": "Update Mobject.deepcopy",
          "label": "D"
        },
        {
          "method": "Sanker",
          "text": "Here is a suitable commit message:\n\n`Simplify and improve Mobject deepcopy method` \n\n(or alternatively)\n\n`Replace pickle with copy.deepcopy in Mobject deepcopy method`)",
          "label": "E"
        }
      ],
      "question_id": 35
    },
    {
      "language": "java",
      "commit_id": "61c446dca23b34962b2f3e64c3b9af3d90bcec5d",
      "gold_msg": "Simplify SearchService#ensureAfterSeqNoRefreshed ()",
      "code_change": "diff --git a/server/src/main/java/org/elasticsearch/search/SearchService.java b/server/src/main/java/org/elasticsearch/search/SearchService.java\nindex 1d349a6940cff..9a12b381890c3 100644\n--- a/server/src/main/java/org/elasticsearch/search/SearchService.java\n+++ b/server/src/main/java/org/elasticsearch/search/SearchService.java\n@@ -134,7 +134,6 @@\n import java.util.concurrent.atomic.AtomicBoolean;\n import java.util.concurrent.atomic.AtomicInteger;\n import java.util.concurrent.atomic.AtomicLong;\n-import java.util.concurrent.atomic.AtomicReference;\n import java.util.function.LongSupplier;\n import java.util.function.Supplier;\n \n@@ -503,107 +502,81 @@ private \u003cT> void ensureAfterSeqNoRefreshed(\n         CheckedSupplier\u003cT, Exception> executable,\n         ActionListener\u003cT> listener\n     ) {\n-        final ActionRunnable\u003cT> runnable = new ActionRunnable\u003c>(listener) {\n-            final Executor executor = getExecutor(shard);\n+        final long waitForCheckpoint = request.waitForCheckpoint();\n+        final Executor executor = getExecutor(shard);\n+        try {\n+            if (waitForCheckpoint \u003c= UNASSIGNED_SEQ_NO) {\n+                runAsync(executor, executable, listener);\n+                return;\n+            }\n+            if (shard.indexSettings().getRefreshInterval().getMillis() \u003c= 0) {\n+                listener.onFailure(new IllegalArgumentException(\"Cannot use wait_for_checkpoints with [index.refresh_interval=-1]\"));\n+                return;\n+            }\n \n-            @Override\n-            protected void doRun() {\n-                final TimeValue timeout = request.getWaitForCheckpointsTimeout();\n-                final long waitForCheckpoint = request.waitForCheckpoint();\n-                if (waitForCheckpoint > UNASSIGNED_SEQ_NO) {\n-                    if (shard.indexSettings().getRefreshInterval().getMillis() \u003c= 0) {\n-                        listener.onFailure(\n-                            new IllegalArgumentException(\"Cannot use wait_for_checkpoints with [index.refresh_interval=-1]\")\n-                        );\n+            final AtomicBoolean isDone = new AtomicBoolean(false);\n+            final TimeValue timeout = request.getWaitForCheckpointsTimeout();\n+            final Scheduler.ScheduledCancellable timeoutTask = NO_TIMEOUT.equals(timeout) ? null : threadPool.schedule(() -> {\n+                if (isDone.compareAndSet(false, true)) {\n+                    listener.onFailure(\n+                        new ElasticsearchTimeoutException(\"Wait for seq_no [{}] refreshed timed out [{}]\", waitForCheckpoint, timeout)\n+                    );\n+                }\n+            }, timeout, Names.SAME);\n+            shard.addRefreshListener(waitForCheckpoint, new ActionListener\u003c>() {\n+                @Override\n+                public void onResponse(Void unused) {\n+                    // We must check that the sequence number is smaller than or equal to the global checkpoint. If it is not,\n+                    // it is possible that a stale shard could return uncommitted documents.\n+                    if (shard.getLastKnownGlobalCheckpoint() >= waitForCheckpoint) {\n+                        searchReady();\n                         return;\n                     }\n-\n-                    final AtomicBoolean isDone = new AtomicBoolean(false);\n-                    final AtomicReference\u003cScheduler.ScheduledCancellable> timeoutTask = new AtomicReference\u003c>();\n-                    final ActionListener\u003cVoid> readyListener = new ActionListener\u003c>() {\n+                    shard.addGlobalCheckpointListener(waitForCheckpoint, new GlobalCheckpointListeners.GlobalCheckpointListener() {\n                         @Override\n-                        public void onResponse(Void unused) {\n-                            // We must check that the sequence number is smaller than or equal to the global checkpoint. If it is not,\n-                            // it is possible that a stale shard could return uncommitted documents.\n-                            if (shard.getLastKnownGlobalCheckpoint() \u003c waitForCheckpoint) {\n-                                TimeValue gclTimeout = NO_TIMEOUT.equals(timeout) == false ? null : timeout;\n-                                shard.addGlobalCheckpointListener(\n-                                    waitForCheckpoint,\n-                                    new GlobalCheckpointListeners.GlobalCheckpointListener() {\n-                                        @Override\n-                                        public Executor executor() {\n-                                            return threadPool.executor(Names.SAME);\n-                                        }\n-\n-                                        @Override\n-                                        public void accept(long g, Exception e) {\n-                                            if (g != UNASSIGNED_SEQ_NO) {\n-                                                assert waitForCheckpoint \u003c= g\n-                                                    : shard.shardId()\n-                                                        + \" only advanced to [\"\n-                                                        + g\n-                                                        + \"] while waiting for [\"\n-                                                        + waitForCheckpoint\n-                                                        + \"]\";\n-                                                searchReady();\n-                                            } else {\n-                                                assert e != null;\n-                                                // Ignore TimeoutException, our scheduled timeout task will handle this\n-                                                if (e instanceof TimeoutException == false) {\n-                                                    onFailure(e);\n-                                                }\n-                                            }\n-                                        }\n-                                    },\n-                                    gclTimeout\n-                                );\n-                            } else {\n-                                searchReady();\n-                            }\n+                        public Executor executor() {\n+                            return threadPool.executor(Names.SAME);\n                         }\n \n                         @Override\n-                        public void onFailure(Exception e) {\n-                            if (isDone.compareAndSet(false, true)) {\n-                                Scheduler.ScheduledCancellable localTimeoutTask = timeoutTask.get();\n-                                if (localTimeoutTask != null) {\n-                                    localTimeoutTask.cancel();\n+                        public void accept(long g, Exception e) {\n+                            if (g != UNASSIGNED_SEQ_NO) {\n+                                assert waitForCheckpoint \u003c= g\n+                                    : shard.shardId() + \" only advanced to [\" + g + \"] while waiting for [\" + waitForCheckpoint + \"]\";\n+                                searchReady();\n+                            } else {\n+                                assert e != null;\n+                                // Ignore TimeoutException, our scheduled timeout task will handle this\n+                                if (e instanceof TimeoutException == false) {\n+                                    onFailure(e);\n                                 }\n-                                listener.onFailure(e);\n                             }\n                         }\n+                    }, NO_TIMEOUT.equals(timeout) == false ? null : timeout);\n+                }\n+\n+                @Override\n+                public void onFailure(Exception e) {\n+                    if (isDone.compareAndSet(false, true)) {\n+                        if (timeoutTask != null) {\n+                            timeoutTask.cancel();\n+                        }\n+                        listener.onFailure(e);\n+                    }\n+                }\n \n-                        private void searchReady() {\n-                            if (isDone.compareAndSet(false, true)) {\n-                                Scheduler.ScheduledCancellable localTimeoutTask = timeoutTask.get();\n-                                if (localTimeoutTask != null) {\n-                                    localTimeoutTask.cancel();\n-                                }\n-                                runAsync(executor, executable, listener);\n-                            }\n+                private void searchReady() {\n+                    if (isDone.compareAndSet(false, true)) {\n+                        if (timeoutTask != null) {\n+                            timeoutTask.cancel();\n                         }\n-                    };\n-                    if (NO_TIMEOUT.equals(timeout) == false && isDone.get() == false) {\n-                        Scheduler.ScheduledCancellable scheduled = threadPool.schedule(\n-                            () -> readyListener.onFailure(\n-                                new ElasticsearchTimeoutException(\n-                                    \"Wait for seq_no [{}] refreshed timed out [{}]\",\n-                                    waitForCheckpoint,\n-                                    timeout\n-                                )\n-                            ),\n-                            timeout,\n-                            Names.SAME\n-                        );\n-                        timeoutTask.set(scheduled);\n+                        runAsync(executor, executable, listener);\n                     }\n-                    shard.addRefreshListener(waitForCheckpoint, readyListener);\n-                } else {\n-                    runAsync(executor, executable, listener);\n                 }\n-            }\n-        };\n-        runnable.run();\n+            });\n+        } catch (Exception e) {\n+            listener.onFailure(e);\n+        }\n     }\n \n     private IndexShard getShard(ShardSearchRequest request) {\n@@ -620,7 +593,7 @@ private IndexShard getShard(ShardSearchRequest request) {\n     }\n \n     private static \u003cT> void runAsync(Executor executor, CheckedSupplier\u003cT, Exception> executable, ActionListener\u003cT> listener) {\n-        executor.execute(ActionRunnable.supply(listener, executable::get));\n+        executor.execute(ActionRunnable.supply(listener, executable));\n     }\n \n     /**",
      "candidates": [
        {
          "method": "NNGen",
          "text": "Utilize Lifecycle observer",
          "label": "A"
        },
        {
          "method": "SRCMG",
          "text": "Remove needless forking in SearchService wait for checkpoint logic",
          "label": "B"
        },
        {
          "method": "COME",
          "text": "Remove Needless Forking in SearchService ()",
          "label": "C"
        },
        {
          "method": "Sanker",
          "text": "Refactor SearchService to simplify wait for checkpoint logic",
          "label": "D"
        },
        {
          "method": "ERICommiter",
          "text": "Refactor waitForCheckpoints Logic in SearchService\n\nThe modifications in the `SearchService.java` file streamline the handling of requests waiting for checkpoints. Key changes include removing redundant code involving `AtomicReference` and `ActionRunnable`, simplifying logic around timeout",
          "label": "E"
        }
      ],
      "question_id": 36
    },
    {
      "language": "python",
      "commit_id": "51bddd862bfdac9e6cefca854b6f2917cfc2715d",
      "gold_msg": "Document callback types in documentation ()",
      "code_change": "diff --git a/docs/docsite/rst/plugins/callback.rst b/docs/docsite/rst/plugins/callback.rst\nindex f86469af28d630..98e4beb754cc3d 100644\n--- a/docs/docsite/rst/plugins/callback.rst\n+++ b/docs/docsite/rst/plugins/callback.rst\n@@ -36,7 +36,7 @@ Most callbacks shipped with Ansible are disabled by default and need to be enabl\n Setting a callback plugin for ``ansible-playbook``\n --------------------------------------------------\n \n-You can only have one plugin be the main manager of your console output. If you want to replace the default, you should define CALLBACK_TYPE = stdout in the subclass and then configure the stdout plugin in :ref:`ansible.cfg \u003cansible_configuration_settings>`. For example:\n+You can only have one plugin be the main manager of your console output. If you want to replace the default, you should define ``CALLBACK_TYPE = stdout`` in the subclass and then configure the stdout plugin in :ref:`ansible.cfg \u003cansible_configuration_settings>`. For example:\n \n .. code-block:: ini\n \n@@ -67,6 +67,25 @@ You can also set this as an environment variable:\n     export ANSIBLE_LOAD_CALLBACK_PLUGINS=1\n \n \n+.. _callback_plugin_types:\n+\n+Types of callback plugins\n+-------------------------\n+\n+There are three types of callback plugins:\n+\n+:stdout callback plugins:\n+\n+  These plugins handle the main console output. Only one of these can be active.\n+\n+:aggregate callback plugins:\n+\n+  Aggregate callbacks can add additional console output next to a stdout callback. This can be aggregate information at the end of a playbook run, additional per-task output, or anything else.\n+\n+:notification callback plugins:\n+\n+  Notification callbacks inform other applications, services, or systems. This can be anything from logging to databases, informing on errors in Instant Messaging applications, or sending emails when a server is unreachable.\n+\n .. _callback_plugin_list:\n \n Plugin list",
      "candidates": [
        {
          "method": "Sanker",
          "text": "\"Add documentation for types of callback plugins\"",
          "label": "A"
        },
        {
          "method": "NNGen",
          "text": "Add training guide",
          "label": "B"
        },
        {
          "method": "ERICommiter",
          "text": "Refactor callback plugin section\n\n- Clarify the process of setting a callback plugin for `ansible-playbook`.\n- Introduce a new section on types of callback plugins, detailing the three categories: stdout, aggregate, and notification callback plugins.\n-",
          "label": "C"
        },
        {
          "method": "SRCMG",
          "text": "Update callback.rst ()",
          "label": "D"
        },
        {
          "method": "COME",
          "text": "Update callback.rst ()",
          "label": "E"
        }
      ],
      "question_id": 37
    },
    {
      "language": "java",
      "commit_id": "bccba706a2981e12ec66361ee4285db21152cf70",
      "gold_msg": "Use simm32 instead of imm32 for addr64",
      "code_change": "diff --git a/Ghidra/Processors/x86/data/languages/ia.sinc b/Ghidra/Processors/x86/data/languages/ia.sinc\nindex 0034519b472..6868b51e8bb 100644\n--- a/Ghidra/Processors/x86/data/languages/ia.sinc\n+++ b/Ghidra/Processors/x86/data/languages/ia.sinc\n@@ -733,7 +733,7 @@ addr64: [Base64 + Index64*ss]\t\t\tis mod=0 & r_m=4; Index64 & Base64 & ss\n addr64: [Base64]\t\t\t\t\t\tis mod=0 & r_m=4; rexXprefix=0 & index64=4 & Base64    { export Base64; }\n addr64: [simm32_64 + Index64*ss]\t\tis mod=0 & r_m=4; Index64 & base64=5 & ss; simm32_64   { local tmp=simm32_64+Index64*ss; export tmp; }\n addr64: [Index64*ss]\t\t\t\t\tis mod=0 & r_m=4; Index64 & base64=5 & ss; imm32=0 { local tmp=Index64*ss; export tmp; }\n-addr64: [imm32_64]\t\t\t\t\t\tis mod=0 & r_m=4; rexXprefix=0 & index64=4 & base64=5; imm32_64      { export *[const]:8 imm32_64; }\n+addr64: [simm32_64]\t\t\t\t\t\tis mod=0 & r_m=4; rexXprefix=0 & index64=4 & base64=5; simm32_64      { export *[const]:8 simm32_64; }\n addr64: [Base64 + simm8_64]\t\t\t\tis mod=1 & r_m=4; rexXprefix=0 & index64=4 & Base64; simm8_64     { local tmp=simm8_64+Base64; export tmp; }\n addr64: [Base64 + Index64*ss + simm8_64] is mod=1 & r_m=4; Index64 & Base64 & ss; simm8_64 { local tmp=simm8_64+Base64+Index64*ss; export tmp; }\n addr64: [Base64 + Index64*ss]\t\t\tis mod=1 & r_m=4; Index64 & Base64 & ss; simm8=0   { local tmp=Base64+Index64*ss; export tmp; }",
      "candidates": [
        {
          "method": "ERICommiter",
          "text": "Updated x86 address semantics to replace `imm32_64` with `simm32_64` for consistency\n\n- Modified the address definition for 64-bit addressing mode to use `simm32_64` instead of `imm32_",
          "label": "A"
        },
        {
          "method": "SRCMG",
          "text": "GP-2061: Fix address mode operand type in ia.sinc",
          "label": "B"
        },
        {
          "method": "Sanker",
          "text": "\"Replace imm32_64 with simm32_64 in addr64 syntax for immediate 32-bit values\"",
          "label": "C"
        },
        {
          "method": "COME",
          "text": "GP-2093: Corrected ia.sinc to reduce memory usage",
          "label": "D"
        },
        {
          "method": "NNGen",
          "text": "GP-2061 added mmxreg2_m64 table to ia.sinc",
          "label": "E"
        }
      ],
      "question_id": 38
    },
    {
      "language": "java",
      "commit_id": "a63292bd140bd5160f285ff62dfd72c546fec7ef",
      "gold_msg": "dbeaver/dbeaver-ee Fix specified url usage for url configuration type for some databases ()",
      "code_change": "diff --git a/plugins/org.jkiss.dbeaver.registry/src/org/jkiss/dbeaver/registry/driver/DriverDescriptor.java b/plugins/org.jkiss.dbeaver.registry/src/org/jkiss/dbeaver/registry/driver/DriverDescriptor.java\nindex a64e03759794..787485f9ccd5 100644\n--- a/plugins/org.jkiss.dbeaver.registry/src/org/jkiss/dbeaver/registry/driver/DriverDescriptor.java\n+++ b/plugins/org.jkiss.dbeaver.registry/src/org/jkiss/dbeaver/registry/driver/DriverDescriptor.java\n@@ -1136,7 +1136,9 @@ public boolean isSampleURLForced() {\n \n     @Override\n     public String getConnectionURL(@NotNull DBPConnectionConfiguration connectionInfo) {\n-        if (isSampleURLForced()) {\n+        if (connectionInfo.getConfigurationType() == DBPDriverConfigurationType.URL) {\n+            return connectionInfo.getUrl();\n+        } else if (isSampleURLForced()) {\n             // Generate URL by template\n             return JDBCURL.generateUrlByTemplate(this, connectionInfo);\n         } else {",
      "candidates": [
        {
          "method": "COME",
          "text": "dbeaver/pro Driver configuration type resolve fix",
          "label": "A"
        },
        {
          "method": "ERICommiter",
          "text": "Use connection URL directly for URL-based configuration\n\nIn the DriverDescriptor class, the connection URL is now directly returned if the configuration type is set to URL, bypassing any URL template generation. This change ensures that when a connection is configured with a URL",
          "label": "B"
        },
        {
          "method": "Sanker",
          "text": "Based on the diff, the commit message could be:\n\n\"Improve getConnectionURL method to handle DBPDriverConfigurationType.URL\"\n\nOr, in a more imperative tone:\n\n\"Handle DBPDriverConfigurationType.URL in getConnectionURL method\" \n\nAlternatively, if you want to make it more descriptive:\n\n\"Modify DriverDescriptor to return URL from connection info when configuration type is URL\"",
          "label": "C"
        },
        {
          "method": "SRCMG",
          "text": "dbeaver/dbeaver-ee URL configuration type fix",
          "label": "D"
        },
        {
          "method": "NNGen",
          "text": "dbeaver/dbeaver-ee Driver dependencies check API + Eclipse plugin initialization enhancement",
          "label": "E"
        }
      ],
      "question_id": 39
    },
    {
      "language": "python",
      "commit_id": "ca61e9ef451d44f97aec60cb7ceb1ce91e1ecc5b",
      "gold_msg": "Release 3.12.3",
      "code_change": "diff --git a/package.json b/package.json\nindex b210dfa551..1db3627f1a 100644\n--- a/package.json\n+++ b/package.json\n@@ -1,6 +1,6 @@\n {\n   \"name\": \"hosts\",\n-  \"version\": \"3.12.2\",\n+  \"version\": \"3.12.3\",\n   \"description\": \"Extending and consolidating hosts files from several well-curated sources like adaway.org, mvps.org, malwaredomainlist.com, someonewhocares.org, and potentially others. You can optionally invoke extensions to block additional sites by category.\",\n   \"main\": \"\",\n   \"private\": true,",
      "candidates": [
        {
          "method": "SRCMG",
          "text": "Release 3.12.3",
          "label": "A"
        },
        {
          "method": "NNGen",
          "text": "Release 3.12.2",
          "label": "B"
        },
        {
          "method": "Sanker",
          "text": "Bump version to 3.12.3",
          "label": "C"
        },
        {
          "method": "COME",
          "text": "Release 3.12.3",
          "label": "D"
        },
        {
          "method": "ERICommiter",
          "text": "Release 3.12.3",
          "label": "E"
        }
      ],
      "question_id": 40
    },
    {
      "language": "java",
      "commit_id": "2cb27e6a494389d11756bdecd44029b12d86bafd",
      "gold_msg": "Bump Node.js from 14.16.0 to 16.15.1 ()",
      "code_change": "diff --git a/war/pom.xml b/war/pom.xml\nindex 7539101ea576..77fb708b3e93 100644\n--- a/war/pom.xml\n+++ b/war/pom.xml\n@@ -46,7 +46,7 @@ THE SOFTWARE.\n     \u003chost>localhost\u003c/host>\n     \u003c!-- HTTP listener port -->\n     \u003cport>8080\u003c/port>\n-    \u003cnode.version>14.16.0\u003c/node.version>\n+    \u003cnode.version>16.15.1\u003c/node.version>\n     \u003cyarn.version>1.22.10\u003c/yarn.version>\n   \u003c/properties>",
      "candidates": [
        {
          "method": "NNGen",
          "text": "Bump Yarn from 1.22.10 to 1.22.19 ()",
          "label": "A"
        },
        {
          "method": "COME",
          "text": "Update dependency node to v16.15.1 ()",
          "label": "B"
        },
        {
          "method": "Sanker",
          "text": "\"Update Node.js version to 16.15.1\"",
          "label": "C"
        },
        {
          "method": "SRCMG",
          "text": "Bump Node from 14.16.0 to 16.15.1 ()",
          "label": "D"
        },
        {
          "method": "ERICommiter",
          "text": "Update Node version to v16.15.1\n\n- Upgrade Node.js from version 14.16.0 to 16.15.1 to ensure compatibility with newer features and security improvements.\n- This change affects the `pom.xml` file",
          "label": "E"
        }
      ],
      "question_id": 41
    },
    {
      "language": "python",
      "commit_id": "17fbee7dd37e7939baf7ff34fb408285ffff5042",
      "gold_msg": "Refresh homeassistant_alerts when hass has started ()",
      "code_change": "diff --git a/homeassistant/components/homeassistant_alerts/__init__.py b/homeassistant/components/homeassistant_alerts/__init__.py\nindex d405b9e257d985..60386e3d080d8e 100644\n--- a/homeassistant/components/homeassistant_alerts/__init__.py\n+++ b/homeassistant/components/homeassistant_alerts/__init__.py\n@@ -14,6 +14,7 @@\n from homeassistant.const import __version__\n from homeassistant.core import HomeAssistant, callback\n from homeassistant.helpers.aiohttp_client import async_get_clientsession\n+from homeassistant.helpers.start import async_at_start\n from homeassistant.helpers.typing import ConfigType\n from homeassistant.helpers.update_coordinator import DataUpdateCoordinator\n from homeassistant.util.yaml import parse_yaml\n@@ -100,7 +101,11 @@ def async_schedule_update_alerts() -> None:\n \n     coordinator = AlertUpdateCoordinator(hass)\n     coordinator.async_add_listener(async_schedule_update_alerts)\n-    await coordinator.async_refresh()\n+\n+    async def initial_refresh(hass: HomeAssistant) -> None:\n+        await coordinator.async_refresh()\n+\n+    async_at_start(hass, initial_refresh)\n \n     return True",
      "candidates": [
        {
          "method": "NNGen",
          "text": "Refresh homeassistant_alerts when hass has started ()",
          "label": "A"
        },
        {
          "method": "COME",
          "text": "Fix lingering timer in homeassistant_alerts ()",
          "label": "B"
        },
        {
          "method": "Sanker",
          "text": "\"Delay initial refresh of alert coordinator until Home Assistant startup is complete\"",
          "label": "C"
        },
        {
          "method": "ERICommiter",
          "text": "Schedule homeassistant_alerts refresh on startup\n\n- Implemented the `async_at_start` helper to ensure alerts are refreshed when Home Assistant starts.\n- Refactored `async_schedule_update_alerts` to use `initial_refresh` for the initial coordinator",
          "label": "D"
        },
        {
          "method": "SRCMG",
          "text": "Refresh homeassistant_alerts when hass has started ()",
          "label": "E"
        }
      ],
      "question_id": 42
    },
    {
      "language": "java",
      "commit_id": "2c58eea78102bc444d57f236e7f71ae755f7a259",
      "gold_msg": "Mark HttpMethod::resolve for removal",
      "code_change": "diff --git a/spring-web/src/main/java/org/springframework/http/HttpMethod.java b/spring-web/src/main/java/org/springframework/http/HttpMethod.java\nindex c71d54cd81b7..126ed3bb747e 100644\n--- a/spring-web/src/main/java/org/springframework/http/HttpMethod.java\n+++ b/spring-web/src/main/java/org/springframework/http/HttpMethod.java\n@@ -138,7 +138,7 @@ public static HttpMethod valueOf(String method) {\n \t * @deprecated in favor of {@link #valueOf(String)}\n \t */\n \t@Nullable\n-\t@Deprecated\n+\t@Deprecated(since = \"6.0\", forRemoval = true)\n \tpublic static HttpMethod resolve(@Nullable String method) {\n \t\treturn (method != null ? valueOf(method) : null);\n \t}",
      "candidates": [
        {
          "method": "COME",
          "text": "Add deprecation note for HttpMethod.resolve()",
          "label": "A"
        },
        {
          "method": "Sanker",
          "text": "\"Deprecate HttpMethod.resolve() in favor of HttpMethod.valueOf()\"",
          "label": "B"
        },
        {
          "method": "ERICommiter",
          "text": "Deprecate HttpMethod.resolve() for removal in 6.0\n\n- Mark `HttpMethod.resolve()` as deprecated for removal in version 6.0.\n- Update the deprecation annotation to include `since=\"6.0\"` and `",
          "label": "C"
        },
        {
          "method": "SRCMG",
          "text": "Deprecate HttpMethod.resolve() with forRemoval = true",
          "label": "D"
        },
        {
          "method": "NNGen",
          "text": "Javadoc",
          "label": "E"
        }
      ],
      "question_id": 43
    },
    {
      "language": "java",
      "commit_id": "27a1cc8648b5e358ce25b2581acea314853c0222",
      "gold_msg": "svm: disable Throwable#getOurStackTrace in TruffleFeature",
      "code_change": "diff --git a/substratevm/src/com.oracle.svm.truffle/src/com/oracle/svm/truffle/TruffleFeature.java b/substratevm/src/com.oracle.svm.truffle/src/com/oracle/svm/truffle/TruffleFeature.java\nindex 70ef4882f9a2..a9feffc28088 100644\n--- a/substratevm/src/com.oracle.svm.truffle/src/com/oracle/svm/truffle/TruffleFeature.java\n+++ b/substratevm/src/com.oracle.svm.truffle/src/com/oracle/svm/truffle/TruffleFeature.java\n@@ -583,6 +583,7 @@ private void initializeMethodBlocklist(MetaAccessProvider metaAccess, FeatureAcc\n         blocklistMethod(metaAccess, Throwable.class, \"fillInStackTrace\");\n         // Implementations which don't call Throwable.fillInStackTrace are allowed\n         implementationOnlyBlocklist(metaAccess, Throwable.class, \"fillInStackTrace\");\n+        blocklistMethod(metaAccess, Throwable.class, \"getOurStackTrace\");\n         blocklistMethod(metaAccess, Throwable.class, \"initCause\", Throwable.class);\n         blocklistMethod(metaAccess, Throwable.class, \"addSuppressed\", Throwable.class);\n         blocklistMethod(metaAccess, System.class, \"getProperty\", String.class);",
      "candidates": [
        {
          "method": "SRCMG",
          "text": "Revert \"svm: disable Throwable#getOurStackTrace in TruffleFeature\"",
          "label": "A"
        },
        {
          "method": "COME",
          "text": "Add \"getOurStackTrace\" method to TruffleFeature",
          "label": "B"
        },
        {
          "method": "NNGen",
          "text": "Revert \"svm: disable Throwable#getOurStackTrace in TruffleFeature\"",
          "label": "C"
        },
        {
          "method": "ERICommiter",
          "text": "Re-add `Throwable#getOurStackTrace` to the blocklist in `TruffleFeature`.",
          "label": "D"
        },
        {
          "method": "Sanker",
          "text": "\"Block getOurStackTrace method in Throwable class\"",
          "label": "E"
        }
      ],
      "question_id": 44
    },
    {
      "language": "python",
      "commit_id": "e7744cf138b11288e4eb7a9913dd79ce8adcc125",
      "gold_msg": "Update both zoom/pan states on wx when triggering from keyboard.",
      "code_change": "diff --git a/lib/matplotlib/backends/backend_wx.py b/lib/matplotlib/backends/backend_wx.py\nindex a7f35368a0a5..0f74d9441d33 100644\n--- a/lib/matplotlib/backends/backend_wx.py\n+++ b/lib/matplotlib/backends/backend_wx.py\n@@ -1134,15 +1134,19 @@ def _icon(name):\n     def get_canvas(self, frame, fig):\n         return type(self.canvas)(frame, -1, fig)\n \n+    def _update_buttons_checked(self):\n+        if \"Pan\" in self.wx_ids:\n+            self.ToggleTool(self.wx_ids[\"Pan\"], self.mode.name == \"PAN\")\n+        if \"Zoom\" in self.wx_ids:\n+            self.ToggleTool(self.wx_ids[\"Zoom\"], self.mode.name == \"ZOOM\")\n+\n     def zoom(self, *args):\n-        tool = self.wx_ids['Zoom']\n-        self.ToggleTool(tool, not self.GetToolState(tool))\n         super().zoom(*args)\n+        self._update_buttons_checked()\n \n     def pan(self, *args):\n-        tool = self.wx_ids['Pan']\n-        self.ToggleTool(tool, not self.GetToolState(tool))\n         super().pan(*args)\n+        self._update_buttons_checked()\n \n     def save_figure(self, *args):\n         # Fetch the required filename and file type.",
      "candidates": [
        {
          "method": "ERICommiter",
          "text": "Backport PR: Ensure consistent button state updates for Zoom/Pan in wx backend\n\nThis commit refactors the `zoom` and `pan` methods in the wx backend to ensure that the button states are consistently updated when the tools are toggled via",
          "label": "A"
        },
        {
          "method": "NNGen",
          "text": "Backport PR : Update both zoom/pan states on wx when triggering from keyboard.",
          "label": "B"
        },
        {
          "method": "SRCMG",
          "text": "Update both zoom/pan states on wx when triggering from keyboard.",
          "label": "C"
        },
        {
          "method": "Sanker",
          "text": "Here is a suitable commit message:\n\n\"Update WX backend to sync tool buttons with current mode\"",
          "label": "D"
        },
        {
          "method": "COME",
          "text": "Backport PR : FIX: update buttons checked on pan and zoom",
          "label": "E"
        }
      ],
      "question_id": 45
    },
    {
      "language": "java",
      "commit_id": "a1d8b775c91f2b76d76024c80ef89835a211f8e5",
      "gold_msg": "[CI] Mute ReactiveStorageIT testScaleWhileShrinking failing ()",
      "code_change": "diff --git a/x-pack/plugin/autoscaling/src/internalClusterTest/java/org/elasticsearch/xpack/autoscaling/storage/ReactiveStorageIT.java b/x-pack/plugin/autoscaling/src/internalClusterTest/java/org/elasticsearch/xpack/autoscaling/storage/ReactiveStorageIT.java\nindex 236c798851d92..f5f93f613aced 100644\n--- a/x-pack/plugin/autoscaling/src/internalClusterTest/java/org/elasticsearch/xpack/autoscaling/storage/ReactiveStorageIT.java\n+++ b/x-pack/plugin/autoscaling/src/internalClusterTest/java/org/elasticsearch/xpack/autoscaling/storage/ReactiveStorageIT.java\n@@ -230,6 +230,7 @@ public void testScaleFromEmptyLegacy() {\n         );\n     }\n \n+    @AwaitsFix(bugUrl = \"https://github.com/elastic/elasticsearch/issues/91083\")\n     public void testScaleWhileShrinking() throws Exception {\n         internalCluster().startMasterOnlyNode();\n         final String dataNode1Name = internalCluster().startDataOnlyNode();",
      "candidates": [
        {
          "method": "SRCMG",
          "text": "Mute ReactiveStorageIT#testScaleWhileShrinking ()",
          "label": "A"
        },
        {
          "method": "COME",
          "text": "Mute ReactiveStorageIT#testScaleWhileShrinking ()",
          "label": "B"
        },
        {
          "method": "Sanker",
          "text": "\"Mark testScaleWhileShrinking as @AwaitsFix for https://github.com/elastic/elasticsearch/issues/91083\"",
          "label": "C"
        },
        {
          "method": "ERICommiter",
          "text": "Mute ReactiveStorageIT#testScaleWhileShrinking\n\nAdd an `@AwaitsFix` annotation to the `testScaleWhileShrinking` test method in the `ReactiveStorageIT` class. This temporarily disables the test due to the issue tracked",
          "label": "D"
        },
        {
          "method": "NNGen",
          "text": "Mute ReactiveStorageIT#testScaleWhileShrinking ()",
          "label": "E"
        }
      ],
      "question_id": 46
    },
    {
      "language": "python",
      "commit_id": "c995e48e11c195698a755049e4f5084349827f5b",
      "gold_msg": "recent: Clarify recenter_focus_if_off_screen.",
      "code_change": "diff --git a/web/src/recent_topics_ui.js b/web/src/recent_topics_ui.js\nindex 041263e848b39..b5ed684764d59 100644\n--- a/web/src/recent_topics_ui.js\n+++ b/web/src/recent_topics_ui.js\n@@ -759,7 +759,7 @@ function topic_offset_to_visible_area(topic_row) {\n     return \"visible\";\n }\n \n-function set_focus_to_element_in_center() {\n+function recenter_focus_if_off_screen() {\n     const table_wrapper_element = document.querySelector(\"#recent_topics_table .table_fix_head\");\n     const $topic_rows = $(\"#recent_topics_table table tbody tr\");\n \n@@ -857,7 +857,7 @@ export function complete_rerender() {\n             popovers.hide_all();\n \n             // Update the focused element for keyboard navigation if needed.\n-            set_focus_to_element_in_center();\n+            recenter_focus_if_off_screen();\n         },\n         get_min_load_count,\n     });",
      "candidates": [
        {
          "method": "SRCMG",
          "text": "recent_topics_ui: Rename set_focus_to_element_in_center to recenter_focus_if_off_screen.",
          "label": "A"
        },
        {
          "method": "COME",
          "text": "popovers: Rename set_focus_to_element_in_center to recenter_focus_if_off_screen.",
          "label": "B"
        },
        {
          "method": "NNGen",
          "text": "popovers: Hide popovers during scroll in recent_conversations.",
          "label": "C"
        },
        {
          "method": "ERICommiter",
          "text": "recent_topics_ui: Rename function to clarify its purpose.\n\nThe function `set_focus_to_element_in_center` has been renamed to `recenter_focus_if_off_screen` to better reflect its functionality of ensuring the focused row is visible within the viewport after a",
          "label": "D"
        },
        {
          "method": "Sanker",
          "text": "\"Rename `set_focus_to_element_in_center` to `recenter_focus_if_off_screen` for clarity\"",
          "label": "E"
        }
      ],
      "question_id": 47
    },
    {
      "language": "java",
      "commit_id": "0997037598f834eaaade38a1945d60b81947e535",
      "gold_msg": "[hotfix][API / DataStream] Make remaining tests methods package private.",
      "code_change": "diff --git a/flink-streaming-java/src/test/java/org/apache/flink/streaming/api/graph/StreamingJobGraphGeneratorTest.java b/flink-streaming-java/src/test/java/org/apache/flink/streaming/api/graph/StreamingJobGraphGeneratorTest.java\nindex 8a6d2c9f582aa..cf09d70e2360d 100644\n--- a/flink-streaming-java/src/test/java/org/apache/flink/streaming/api/graph/StreamingJobGraphGeneratorTest.java\n+++ b/flink-streaming-java/src/test/java/org/apache/flink/streaming/api/graph/StreamingJobGraphGeneratorTest.java\n@@ -257,7 +257,7 @@ void testEnabledUnalignedCheckAndDisabledCheckpointing() {\n     }\n \n     @Test\n-    public void testTransformationSetParallelism() {\n+    void testTransformationSetParallelism() {\n         StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();\n         /* The default parallelism of the environment (that is inherited by the source)\n         and the parallelism of the map operator needs to be different for this test */\n@@ -284,7 +284,7 @@ public void testTransformationSetParallelism() {\n     }\n \n     @Test\n-    public void testChainNodeSetParallelism() {\n+    void testChainNodeSetParallelism() {\n         StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();\n         env.fromSequence(1L, 3L).map(value -> value).print().setParallelism(env.getParallelism());\n         StreamGraph streamGraph = env.getStreamGraph();\n@@ -306,7 +306,7 @@ public void testChainNodeSetParallelism() {\n     }\n \n     @Test\n-    public void testChainedSourcesSetParallelism() {\n+    void testChainedSourcesSetParallelism() {\n         StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();\n         MultipleInputTransformation\u003cLong> transform =\n                 new MultipleInputTransformation\u003c>(\n@@ -350,7 +350,7 @@ public void testChainedSourcesSetParallelism() {\n     }\n \n     @Test\n-    public void testDynamicGraphVertexParallelism() {\n+    void testDynamicGraphVertexParallelism() {\n         StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();\n         int defaultParallelism = 20;\n         env.setParallelism(defaultParallelism);",
      "candidates": [
        {
          "method": "Sanker",
          "text": "\"Remove unnecessary public access modifiers from test methods in StreamingJobGraphGeneratorTest\"",
          "label": "A"
        },
        {
          "method": "NNGen",
          "text": "[FLINK-31401][streaming][tests] Make parallelism assumption explicit in StreamingJobGraphGeneratorTest",
          "label": "B"
        },
        {
          "method": "ERICommiter",
          "text": "[hotfix][tests] Convert StreamingJobGraphGeneratorTest methods to package-private in preparation for JUnit 5 migration\n\n- Changed test method visibility from `public` to package-private to align with JUnit 5 conventions.\n- This change is",
          "label": "C"
        },
        {
          "method": "SRCMG",
          "text": "[FLINK-31401][tests] Replace public test methods with package-private visibility",
          "label": "D"
        },
        {
          "method": "COME",
          "text": "[hotfix][tests] Make parallelism assumption explicit in StreamingJobGraphGeneratorTest",
          "label": "E"
        }
      ],
      "question_id": 48
    },
    {
      "language": "java",
      "commit_id": "2c792d0d9b3740822a536ac55af0037dfcb522b2",
      "gold_msg": "[FLINK-25532] Improve Documentation of Flink Docker-Compose ()",
      "code_change": "diff --git a/docs/content/docs/deployment/resource-providers/standalone/docker.md b/docs/content/docs/deployment/resource-providers/standalone/docker.md\nindex 7b2440a286975..f6cf9e752a7cc 100644\n--- a/docs/content/docs/deployment/resource-providers/standalone/docker.md\n+++ b/docs/content/docs/deployment/resource-providers/standalone/docker.md\n@@ -35,7 +35,7 @@ This *Getting Started* section guides you through the local setup (on one machin\n \n [Docker](https://www.docker.com) is a popular container runtime.\n There are official Docker images for Apache Flink available [on Docker Hub](https://hub.docker.com/_/flink).\n-You can use the Docker images to deploy a *Session* or *Application cluster* on Docker. This page focuses on the setup of Flink on Docker, Docker Swarm and Docker Compose.\n+You can use the Docker images to deploy a *Session* or *Application cluster* on Docker. This page focuses on the setup of Flink on Docker and Docker Compose.\n \n Deployment into managed containerized environments, such as [standalone Kubernetes]({{\u003c ref \"docs/deployment/resource-providers/standalone/kubernetes\" >}}) or [native Kubernetes]({{\u003c ref \"docs/deployment/resource-providers/native_kubernetes\" >}}), are described on separate pages.\n \n@@ -96,16 +96,15 @@ This allows you to deploy a standalone cluster (Session or Application Mode) in\n * manually in a local Docker setup,\n * [in a Kubernetes cluster]({{\u003c ref \"docs/deployment/resource-providers/standalone/kubernetes\" >}}),\n * [with Docker Compose](#flink-with-docker-compose),\n-* [with Docker swarm](#flink-with-docker-swarm).\n \n \u003cspan class=\"label label-info\">Note\u003c/span> [The native Kubernetes]({{\u003c ref \"docs/deployment/resource-providers/native_kubernetes\" >}}) also runs the same image by default\n and deploys TaskManagers on demand so that you do not have to do it manually.\n \n The next chapters describe how to start a single Flink Docker container for various purposes.\n \n-Once you've started Flink on Docker, you can access the Flink Webfrontend on [localhost:8081](http://localhost:8081/#/overview) or submit jobs like this `./bin/flink run ./examples/streaming/TopSpeedWindowing.jar`.\n+Once you've started Flink on Docker, you can access the Flink Web UI on [localhost:8081](http://localhost:8081/#/overview) or submit jobs like this `./bin/flink run ./examples/streaming/TopSpeedWindowing.jar`.\n \n-We recommend using [Docker Compose](#flink-with-docker-compose) or [Docker Swarm](#flink-with-docker-swarm) for deploying Flink in Session Mode to ease system configuration.\n+We recommend using [Docker Compose](#flink-with-docker-compose) for deploying Flink in Session Mode to ease system configuration.\n \n \n ### Application Mode\n@@ -212,9 +211,9 @@ Local deployment in the Session Mode has already been described in the [Getting\n \n {{\u003c top >}}\n \n-## Flink on Docker Reference\n+## Flink Docker Images\n \n-### Image hosting\n+### Image Hosting\n \n There are two distribution channels for the Flink Docker images:\n 1. [Official Flink images on Docker Hub (reviewed and build by Docker)](https://hub.docker.com/_/flink/)\n@@ -224,7 +223,7 @@ We recommend using the official images on Docker Hub, as they are reviewed by Do\n \n Launching an image named `flink:latest` will pull the latest image from Docker Hub. In order to use the images hosted in `apache/flink`, replace `flink` by `apache/flink`. Any of the image tags (starting from Flink 1.11.3) are available on `apache/flink` as well.\n \n-### Image tags\n+### Image Tags\n \n The [Flink Docker repository](https://hub.docker.com/_/flink/) is hosted on Docker Hub and serves images of Flink version 1.2.1 and later.\n The source for these images can be found in the [Apache flink-docker](https://github.com/apache/flink-docker) repository.\n@@ -247,68 +246,177 @@ You can see that certain tags include the version of Hadoop, e.g. (e.g. `-hadoop\n Beginning with Flink 1.5, image tags that omit the Hadoop version correspond to Hadoop-free releases of Flink\n that do not include a bundled Hadoop distribution.\n \n+## Flink with Docker Compose\n \n-### Passing configuration via environment variables\n+[Docker Compose](https://docs.docker.com/compose/) is a way to run a group of Docker containers locally.\n+The next sections show examples of configuration files to run Flink.\n \n-When you run Flink image, you can also change its configuration options by setting the environment variable `FLINK_PROPERTIES`:\n+### General\n \n-```sh\n-$ FLINK_PROPERTIES=\"jobmanager.rpc.address: host\n-taskmanager.numberOfTaskSlots: 3\n-blob.server.port: 6124\n-\"\n-$ docker run --env FLINK_PROPERTIES=${FLINK_PROPERTIES} flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}} \u003cjobmanager|standalone-job|taskmanager>\n-```\n+* Create the docker-compose.yaml file. Please check the examples in the sections below:\n+    * [Application Mode](#app-cluster-yml)\n+    * [Session Mode](#session-cluster-yml)\n+    * [Session Mode with SQL Client](#session-cluster-sql-yaml)\n \n-The [`jobmanager.rpc.address`]({{\u003c ref \"docs/deployment/config\" >}}#jobmanager-rpc-address) option must be configured, others are optional to set.\n+* Launch a cluster in the foreground (use `-d` for background)\n \n-The environment variable `FLINK_PROPERTIES` should contain a list of Flink cluster configuration options separated by new line,\n-the same way as in the `flink-conf.yaml`. `FLINK_PROPERTIES` takes precedence over configurations in `flink-conf.yaml`.\n+    ```sh\n+    $ docker-compose up\n+    ```\n \n-### Provide custom configuration\n+* Scale the cluster up or down to `N` TaskManagers\n \n-The configuration files (`flink-conf.yaml`, logging, hosts etc) are located in the `/opt/flink/conf` directory in the Flink image.\n-To provide a custom location for the Flink configuration files, you can\n+    ```sh\n+    $ docker-compose scale taskmanager=\u003cN>\n+    ```\n \n-* **either mount a volume** with the custom configuration files to this path `/opt/flink/conf` when you run the Flink image:\n+* Access the JobManager container\n \n     ```sh\n-    $ docker run \\\n-        --mount type=bind,src=/host/path/to/custom/conf,target=/opt/flink/conf \\\n-        flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}} \u003cjobmanager|standalone-job|taskmanager>\n+    $ docker exec -it $(docker ps --filter name=jobmanager --format={{.ID}}) /bin/sh\n     ```\n \n-* or add them to your **custom Flink image**, build and run it:\n-\n+* Kill the cluster\n \n-    ```dockerfile\n-    FROM flink\n-    ADD /host/path/to/flink-conf.yaml /opt/flink/conf/flink-conf.yaml\n-    ADD /host/path/to/log4j.properties /opt/flink/conf/log4j.properties\n+    ```sh\n+    $ docker-compose down\n     ```\n \n-{{\u003c hint info >}}\n-The mounted volume must contain all necessary configuration files.\n-The `flink-conf.yaml` file must have write permission so that the Docker entry point script can modify it in certain cases.\n-{{\u003c /hint >}}\n+* Access Web UI\n \n-### Using filesystem plugins\n+  When the cluster is running, you can visit the web UI at [http://localhost:8081](http://localhost:8081).\n \n-As described in the [plugins]({{\u003c ref \"docs/deployment/filesystems/plugins\" >}}) documentation page: In order to use plugins they must be\n-copied to the correct location in the Flink installation in the Docker container for them to work.\n+### Application Mode\n \n-If you want to enable plugins provided with Flink (in the `opt/` directory of the Flink distribution), you can pass the environment variable `ENABLE_BUILT_IN_PLUGINS` when you run the Flink image.\n-The `ENABLE_BUILT_IN_PLUGINS` should contain a list of plugin jar file names separated by `;`. A valid plugin name is for example `flink-s3-fs-hadoop-{{\u003c version >}}.jar`\n+In application mode you start a Flink cluster that is dedicated to run only the Flink Jobs which have been bundled with the images.\n+Hence, you need to build a dedicated Flink Image per application.\n+Please check [here](#application-mode) for the details.\n+See also [how to specify the JobManager arguments](#jobmanager-additional-command-line-arguments) in the `command` for the `jobmanager` service.\n \n-```sh\n-    $ docker run \\\n-        --env ENABLE_BUILT_IN_PLUGINS=flink-plugin1.jar;flink-plugin2.jar \\\n-        flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}} \u003cjobmanager|standalone-job|taskmanager>\n+\u003ca id=\"app-cluster-yml\">`docker-compose.yml`\u003c/a> for *Application Mode*.\n+\n+```yaml\n+version: \"2.2\"\n+services:\n+  jobmanager:\n+    image: flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}}\n+    ports:\n+      - \"8081:8081\"\n+    command: standalone-job --job-classname com.job.ClassName [--job-id \u003cjob id>] [--fromSavepoint /path/to/savepoint [--allowNonRestoredState]] [job arguments]\n+    volumes:\n+      - /host/path/to/job/artifacts:/opt/flink/usrlib\n+    environment:\n+      - |\n+        FLINK_PROPERTIES=\n+        jobmanager.rpc.address: jobmanager\n+        parallelism.default: 2\n+\n+  taskmanager:\n+    image: flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}}\n+    depends_on:\n+      - jobmanager\n+    command: taskmanager\n+    scale: 1\n+    volumes:\n+      - /host/path/to/job/artifacts:/opt/flink/usrlib\n+    environment:\n+      - |\n+        FLINK_PROPERTIES=\n+        jobmanager.rpc.address: jobmanager\n+        taskmanager.numberOfTaskSlots: 2\n+        parallelism.default: 2\n ```\n \n-There are also more [advanced ways](#advanced-customization) for customizing the Flink image.\n+### Session Mode\n+\n+In Session Mode you use docker-compose to spin up a long-running Flink Cluster to which you can then submit Jobs.\n+\n+\u003ca id=\"session-cluster-yml\">`docker-compose.yml`\u003c/a> for *Session Mode*:\n+\n+```yaml\n+version: \"2.2\"\n+services:\n+  jobmanager:\n+    image: flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}}\n+    ports:\n+      - \"8081:8081\"\n+    command: jobmanager\n+    environment:\n+      - |\n+        FLINK_PROPERTIES=\n+        jobmanager.rpc.address: jobmanager\n+\n+  taskmanager:\n+    image: flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}}\n+    depends_on:\n+      - jobmanager\n+    command: taskmanager\n+    scale: 1\n+    environment:\n+      - |\n+        FLINK_PROPERTIES=\n+        jobmanager.rpc.address: jobmanager\n+        taskmanager.numberOfTaskSlots: 2\n+```\n+### Flink SQL Client with Session Cluster\n \n-### Enabling Python\n+In this example, you spin up a long-running session cluster and a Flink SQL CLI which uses this clusters to submit jobs to.\n+\n+\u003ca id=\"session-cluster-sql-yaml\">`docker-compose.yml`\u003c/a> for Flink SQL Client with *Session Cluster*:\n+\n+```yaml\n+version: \"2.2\"\n+services:\n+  jobmanager:\n+    image: flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}}\n+    ports:\n+      - \"8081:8081\"\n+    command: jobmanager\n+    environment:\n+      - |\n+        FLINK_PROPERTIES=\n+        jobmanager.rpc.address: jobmanager\n+\n+  taskmanager:\n+    image: flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}}\n+    depends_on:\n+      - jobmanager\n+    command: taskmanager\n+    scale: 1\n+    environment:\n+      - |\n+        FLINK_PROPERTIES=\n+        jobmanager.rpc.address: jobmanager\n+        taskmanager.numberOfTaskSlots: 2\n+  sql-client:\n+    image: flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}}\n+    command: bin/sql-client.sh\n+    depends_on:\n+      - jobmanager\n+    environment:\n+      - |\n+        FLINK_PROPERTIES=\n+        jobmanager.rpc.address: jobmanager\n+```\n+* In order to start the SQL Client run\n+  ```sh\n+  docker-compose run sql-client\n+  ```\n+  You can then start creating tables and queries those.\n+\n+* Note, that all required dependencies (e.g. for connectors) need to be available in the cluster as well as the client.\n+  For example, if you would like to use the Kafka Connector create a custom image with the following Dockerfile\n+  \n+  ```Dockerfile\n+  FROM flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}}\n+  RUN wget -P /opt/flink/lib https://repo.maven.apache.org/maven2/org/apache/flink/flink-sql-connector-kafka_2.12/{{\u003c version >}}/flink-sql-connector-kafka_scala{{\u003c scala_version >}}-{{\u003c version >}}.jar\n+  ```\n+  \n+  and reference it (e.g via the `build`) command in the Dockerfile.\n+  and reference it (e.g via the `build`) command in the Dockerfile. \n+  SQL Commands like `ADD JAR` will not work for JARs located on the host machine as they only work with the local filesystem, which in this case is Docker's overlay filesystem. \n+\n+## Using Flink Python on Docker\n \n To build a custom image which has Python and PyFlink prepared, you can refer to the following Dockerfile:\n ```Dockerfile\n@@ -364,7 +472,69 @@ Build the image named as **pyflink:latest**:\n $ docker build --tag pyflink:latest .\n ```\n \n-### Switch memory allocator\n+## Configuring Flink on Docker\n+\n+### Via Environment Variables\n+\n+When you run Flink image, you can also change its configuration options by setting the environment variable `FLINK_PROPERTIES`:\n+\n+```sh\n+$ FLINK_PROPERTIES=\"jobmanager.rpc.address: host\n+taskmanager.numberOfTaskSlots: 3\n+blob.server.port: 6124\n+\"\n+$ docker run --env FLINK_PROPERTIES=${FLINK_PROPERTIES} flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}} \u003cjobmanager|standalone-job|taskmanager>\n+```\n+\n+The [`jobmanager.rpc.address`]({{\u003c ref \"docs/deployment/config\" >}}#jobmanager-rpc-address) option must be configured, others are optional to set.\n+\n+The environment variable `FLINK_PROPERTIES` should contain a list of Flink cluster configuration options separated by new line,\n+the same way as in the `flink-conf.yaml`. `FLINK_PROPERTIES` takes precedence over configurations in `flink-conf.yaml`.\n+\n+### Via flink-conf.yaml\n+\n+The configuration files (`flink-conf.yaml`, logging, hosts etc) are located in the `/opt/flink/conf` directory in the Flink image.\n+To provide a custom location for the Flink configuration files, you can\n+\n+* **either mount a volume** with the custom configuration files to this path `/opt/flink/conf` when you run the Flink image:\n+\n+    ```sh\n+    $ docker run \\\n+        --mount type=bind,src=/host/path/to/custom/conf,target=/opt/flink/conf \\\n+        flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}} \u003cjobmanager|standalone-job|taskmanager>\n+    ```\n+\n+* or add them to your **custom Flink image**, build and run it:\n+\n+\n+    ```dockerfile\n+    FROM flink\n+    ADD /host/path/to/flink-conf.yaml /opt/flink/conf/flink-conf.yaml\n+    ADD /host/path/to/log4j.properties /opt/flink/conf/log4j.properties\n+    ```\n+\n+{{\u003c hint info >}}\n+The mounted volume must contain all necessary configuration files.\n+The `flink-conf.yaml` file must have write permission so that the Docker entry point script can modify it in certain cases.\n+{{\u003c /hint >}}\n+\n+### Using Filesystem Plugins\n+\n+As described in the [plugins]({{\u003c ref \"docs/deployment/filesystems/plugins\" >}}) documentation page: In order to use plugins they must be\n+copied to the correct location in the Flink installation in the Docker container for them to work.\n+\n+If you want to enable plugins provided with Flink (in the `opt/` directory of the Flink distribution), you can pass the environment variable `ENABLE_BUILT_IN_PLUGINS` when you run the Flink image.\n+The `ENABLE_BUILT_IN_PLUGINS` should contain a list of plugin jar file names separated by `;`. A valid plugin name is for example `flink-s3-fs-hadoop-{{\u003c version >}}.jar`\n+\n+```sh\n+    $ docker run \\\n+        --env ENABLE_BUILT_IN_PLUGINS=flink-plugin1.jar;flink-plugin2.jar \\\n+        flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}} \u003cjobmanager|standalone-job|taskmanager>\n+```\n+\n+There are also more [advanced ways](#advanced-customization) for customizing the Flink image.\n+\n+### Switching the Memory Allocator\n \n Flink introduced `jemalloc` as default memory allocator to resolve memory fragmentation problem (please refer to [FLINK-19125](https://issues.apache.org/jira/browse/FLINK-19125)).\n \n@@ -377,7 +547,7 @@ You could switch back to use `glibc` as the memory allocator to restore the old\n       flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}} \u003cjobmanager|standalone-job|taskmanager>\n ```\n \n-For users that are still using `glibc` memory allocator, the [glibc bug](https://sourceware.org/bugzilla/show_bug.cgi?id=15321) can easily be reproduced, especially while savepoints or full checkpoints with RocksDBStateBackend are created. \n+For users that are still using `glibc` memory allocator, the [glibc bug](https://sourceware.org/bugzilla/show_bug.cgi?id=15321) can easily be reproduced, especially while savepoints or full checkpoints with RocksDBStateBackend are created.\n Setting the environment variable `MALLOC_ARENA_MAX` can avoid unlimited memory growth:\n \n ```sh\n@@ -386,7 +556,7 @@ Setting the environment variable `MALLOC_ARENA_MAX` can avoid unlimited memory g\n       flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}} \u003cjobmanager|standalone-job|taskmanager>\n ```\n \n-### Advanced customization\n+### Further Customization\n \n There are several ways in which you can further customize the Flink image:\n \n@@ -452,7 +622,7 @@ You can customize the Flink image in several ways:\n     ENV VAR_NAME value\n     ```\n \n-  **Commands for building**:\n+**Commands for building**:\n \n     ```sh\n     $ docker build --tag custom_flink_image .\n@@ -461,217 +631,4 @@ You can customize the Flink image in several ways:\n     $ docker push custom_flink_image\n     ```\n \n-\n-### Flink with Docker Compose\n-\n-[Docker Compose](https://docs.docker.com/compose/) is a way to run a group of Docker containers locally.\n-The next sections show examples of configuration files to run Flink.\n-\n-#### Usage\n-\n-* Create the `yaml` files with the container configuration, check examples for:\n-  * [Application cluster](#app-cluster-yml)\n-  * [Session cluster](#session-cluster-yml)\n-\n-  See also [the Flink Docker image tags](#image-tags) and [how to customize the Flink Docker image](#advanced-customization)\n-  for usage in the configuration files.\n-\n-* Launch a cluster in the foreground (use `-d` for background)\n-\n-    ```sh\n-    $ docker-compose up\n-    ```\n-\n-* Scale the cluster up or down to `N` TaskManagers\n-\n-    ```sh\n-    $ docker-compose scale taskmanager=\u003cN>\n-    ```\n-\n-* Access the JobManager container\n-\n-    ```sh\n-    $ docker exec -it $(docker ps --filter name=jobmanager --format={{.ID}}) /bin/sh\n-    ```\n-\n-* Kill the cluster\n-\n-    ```sh\n-    $ docker-compose kill\n-    ```\n-\n-* Access Web UI\n-\n-  When the cluster is running, you can visit the web UI at [http://localhost:8081](http://localhost:8081).\n-  You can also use the web UI to submit a job to a *Session cluster*.\n-\n-* To submit a job to a *Session cluster* via the command line, you can either\n-\n-  * use [Flink CLI]({{\u003c ref \"docs/deployment/cli\" >}}) on the host if it is installed:\n-\n-    ```sh\n-    $ ./bin/flink run --detached --class ${JOB_CLASS_NAME} /job.jar\n-    ```\n-\n-  * or copy the JAR to the JobManager container and submit the job using the [CLI]({{\u003c ref \"docs/deployment/cli\" >}}) from there, for example:\n-\n-    ```sh\n-    $ JOB_CLASS_NAME=\"com.job.ClassName\"\n-    $ JM_CONTAINER=$(docker ps --filter name=jobmanager --format={{.ID}}))\n-    $ docker cp path/to/jar \"${JM_CONTAINER}\":/job.jar\n-    $ docker exec -t -i \"${JM_CONTAINER}\" flink run -d -c ${JOB_CLASS_NAME} /job.jar\n-    ```\n-\n-Here, we provide the \u003ca id=\"app-cluster-yml\">`docker-compose.yml`\u003c/a> for *Application Cluster*.\n-\n-Note: For the Application Mode cluster, the artifacts must be available in the Flink containers, check details [here](#application-mode-on-docker).\n-See also [how to specify the JobManager arguments](#jobmanager-additional-command-line-arguments)\n-in the `command` for the `jobmanager` service.\n-\n-```yaml\n-version: \"2.2\"\n-services:\n-  jobmanager:\n-    image: flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}}\n-    ports:\n-      - \"8081:8081\"\n-    command: standalone-job --job-classname com.job.ClassName [--job-id \u003cjob id>] [--fromSavepoint /path/to/savepoint [--allowNonRestoredState]] [job arguments]\n-    volumes:\n-      - /host/path/to/job/artifacts:/opt/flink/usrlib\n-    environment:\n-      - |\n-        FLINK_PROPERTIES=\n-        jobmanager.rpc.address: jobmanager\n-        parallelism.default: 2\n-\n-  taskmanager:\n-    image: flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}}\n-    depends_on:\n-      - jobmanager\n-    command: taskmanager\n-    scale: 1\n-    volumes:\n-      - /host/path/to/job/artifacts:/opt/flink/usrlib\n-    environment:\n-      - |\n-        FLINK_PROPERTIES=\n-        jobmanager.rpc.address: jobmanager\n-        taskmanager.numberOfTaskSlots: 2\n-        parallelism.default: 2\n-```\n-\n-\n-As well as the \u003ca id=\"session-cluster-yml\">`docker-compose.yml`\u003c/a> for *Session Cluster*:\n-\n-\n-```yaml\n-version: \"2.2\"\n-services:\n-  jobmanager:\n-    image: flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}}\n-    ports:\n-      - \"8081:8081\"\n-    command: jobmanager\n-    environment:\n-      - |\n-        FLINK_PROPERTIES=\n-        jobmanager.rpc.address: jobmanager\n-\n-  taskmanager:\n-    image: flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}}\n-    depends_on:\n-      - jobmanager\n-    command: taskmanager\n-    scale: 1\n-    environment:\n-      - |\n-        FLINK_PROPERTIES=\n-        jobmanager.rpc.address: jobmanager\n-        taskmanager.numberOfTaskSlots: 2\n-```\n-\n-\n-### Flink with Docker Swarm\n-\n-The [Docker swarm](https://docs.docker.com/engine/swarm) is a container orchestration tool, that\n-allows you to manage multiple containers deployed across multiple host machines.\n-\n-The following chapters contain examples of how to configure and start JobManager and TaskManager containers.\n-You can adjust them accordingly to start a cluster.\n-See also [the Flink Docker image tags](#image-tags) and [how to customize the Flink Docker image](#advanced-customization) for usage in the provided scripts.\n-\n-The port `8081` is exposed for the Flink Web UI access.\n-If you run the swarm locally, you can visit the web UI at [http://localhost:8081](http://localhost:8081) after starting the cluster.\n-\n-#### Session Cluster with Docker Swarm\n-\n-```sh\n-$ FLINK_PROPERTIES=\"jobmanager.rpc.address: flink-session-jobmanager\n-taskmanager.numberOfTaskSlots: 2\n-\"\n-\n-# Create overlay network\n-$ docker network create -d overlay flink-session\n-\n-# Create the JobManager service\n-$ docker service create \\\n-  --name flink-session-jobmanager \\\n-  --env FLINK_PROPERTIES=\"${FLINK_PROPERTIES}\" \\\n-  --publish 8081:8081 \\\n-  --network flink-session \\\n-  flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}} \\\n-    jobmanager\n-\n-# Create the TaskManager service (scale this out as needed)\n-$ docker service create \\\n-  --name flink-session-taskmanager \\\n-  --replicas 2 \\\n-  --env FLINK_PROPERTIES=\"${FLINK_PROPERTIES}\" \\\n-  --network flink-session \\\n-  flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}} \\\n-    taskmanager\n-```\n-\n-#### Application Cluster with Docker Swarm\n-\n-```sh\n-$ FLINK_PROPERTIES=\"jobmanager.rpc.address: flink-jobmanager\n-taskmanager.numberOfTaskSlots: 2\n-\"\n-\n-# Create overlay network\n-$ docker network create -d overlay flink-job\n-\n-# Create the JobManager service\n-$ docker service create \\\n-  --name flink-jobmanager \\\n-  --env FLINK_PROPERTIES=\"${FLINK_PROPERTIES}\" \\\n-  --mount type=bind,source=/host/path/to/job/artifacts,target=/opt/flink/usrlib \\\n-  --publish 8081:8081 \\\n-  --network flink-job \\\n-  flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}} \\\n-    standalone-job \\\n-    --job-classname com.job.ClassName \\\n-    [--job-id \u003cjob id>] \\\n-    [--fromSavepoint /path/to/savepoint [--allowNonRestoredState]] \\\n-    [job arguments]\n-\n-# Create the TaskManager service (scale this out as needed)\n-$ docker service create \\\n-  --name flink-job-taskmanager \\\n-  --replicas 2 \\\n-  --env FLINK_PROPERTIES=\"${FLINK_PROPERTIES}\" \\\n-  --mount type=bind,source=/host/path/to/job/artifacts,target=/opt/flink/usrlib \\\n-  --network flink-job \\\n-  flink:{{\u003c stable >}}{{\u003c version >}}-scala{{\u003c scala_version >}}{{\u003c /stable >}}{{\u003c unstable >}}latest{{\u003c /unstable >}} \\\n-    taskmanager\n-```\n-\n-The *job artifacts* must be available in the JobManager container, as outlined [here](#application-mode-on-docker).\n-See also [how to specify the JobManager arguments](#jobmanager-additional-command-line-arguments) to pass them\n-to the `flink-jobmanager` container.\n-\n-The example assumes that you run the swarm locally and expects the *job artifacts* to be in `/host/path/to/job/artifacts`.\n-It also mounts the host path with the artifacts as a volume to the container's path `/opt/flink/usrlib`.\n-\n {{\u003c top >}}",
      "candidates": [
        {
          "method": "NNGen",
          "text": "[FLINK-26014][docs] Add documentation for how to use the working directory on K8s",
          "label": "A"
        },
        {
          "method": "Sanker",
          "text": "Removed references to Docker Swarm and changed title of Flink on Docker Reference to Flink Docker Images",
          "label": "B"
        },
        {
          "method": "ERICommiter",
          "text": "[docs] Refine Flink Docker setup documentation\n\n- Removed references to Docker Swarm as a deployment option, focusing on Docker and Docker Compose.\n- Updated access description to the Flink Web UI.\n- Streamlined recommendations for deploying Flink in",
          "label": "C"
        },
        {
          "method": "COME",
          "text": "[hotfix][docs] Fix typo in docker deployment documentation",
          "label": "D"
        },
        {
          "method": "SRCMG",
          "text": "[site] Remove standalone Docker swarm documentation as it is no longer supported",
          "label": "E"
        }
      ],
      "question_id": 49
    },
    {
      "language": "python",
      "commit_id": "19ab70c922b7e06dcfa248bd40daa996ee5492ef",
      "gold_msg": "node tests: Remove unneeded mock.",
      "code_change": "diff --git a/frontend_tests/node_tests/compose_video.js b/frontend_tests/node_tests/compose_video.js\nindex 27a15ed4c97a1..c446fd9ea7bc1 100644\n--- a/frontend_tests/node_tests/compose_video.js\n+++ b/frontend_tests/node_tests/compose_video.js\n@@ -11,9 +11,6 @@ const events = require(\"./lib/events\");\n \n const channel = mock_esm(\"../../static/js/channel\");\n const upload = mock_esm(\"../../static/js/upload\");\n-mock_esm(\"../../static/js/giphy\", {\n-    is_giphy_enabled: () => true,\n-});\n mock_esm(\"../../static/js/resize\", {\n     watch_manual_resize() {},\n });",
      "candidates": [
        {
          "method": "SRCMG",
          "text": "node-tests: Remove unnecessary mock for giphy module in compose_video test.",
          "label": "A"
        },
        {
          "method": "NNGen",
          "text": "recent_topics: Fix typo.",
          "label": "B"
        },
        {
          "method": "ERICommiter",
          "text": "compose_video: Remove unused giphy mock in tests.\n\nThe giphy mock setup in `compose_video.js` was removed as it is not utilized within the test file. This cleanup simplifies the test environment and eliminates unnecessary mock configurations, ensuring that the test",
          "label": "C"
        },
        {
          "method": "Sanker",
          "text": "Remove mock of Giphy enable check in compose video test",
          "label": "D"
        },
        {
          "method": "COME",
          "text": "compose_video: Remove unnecessary giphy mock.",
          "label": "E"
        }
      ],
      "question_id": 50
    }
  ]
};
